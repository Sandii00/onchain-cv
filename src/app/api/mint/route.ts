import { NextRequest, NextResponse } from "next/server";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity, generateSigner, publicKey as umiPubKey } from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

export const runtime = "nodejs";

const TIER_IMAGES: Record<string, string> = {
  "Top 1%":  "https://onchaincv.xyz/nft/tier1.png",
  "Top 5%":  "https://onchaincv.xyz/nft/tier5.png",
  "Top 10%": "https://onchaincv.xyz/nft/tier10.png",
  "Top 25%": "https://onchaincv.xyz/nft/tier25.png",
  "Active":  "https://onchaincv.xyz/nft/active.png",
};

export async function POST(req: NextRequest) {
  try {
    const { wallet, tier, totalTxs } = await req.json();

    if (!wallet) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    // Server keypair from env (this account pays for minting)
    const secretKeyStr = process.env.MINT_AUTHORITY_SECRET_KEY;
    if (!secretKeyStr) {
      return NextResponse.json({ error: "Mint authority not configured" }, { status: 500 });
    }

    const apiKey    = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    const rpcUrl    = apiKey
      ? `https://mainnet.helius-rpc.com/?api-key=${apiKey}`
      : "https://api.mainnet-beta.solana.com";

    const umi = createUmi(rpcUrl).use(mplCore());

    // Load server signer keypair
    const secretKey = Uint8Array.from(JSON.parse(secretKeyStr));
    const keypair   = umi.eddsa.createKeypairFromSecretKey(secretKey);
    const signer    = createSignerFromKeypair(umi, keypair);
    umi.use(signerIdentity(signer));

    const assetSigner = generateSigner(umi);

    const name = `OnChain CV · ${tier}`;
    const uri  = `https://onchaincv.xyz/metadata/${encodeURIComponent(wallet)}.json`;

    const { signature } = await create(umi, {
      asset:  assetSigner,
      name,
      uri,
      owner:  umiPubKey(wallet),
    }).sendAndConfirm(umi);

    const sig = base58.deserialize(signature)[0];

    return NextResponse.json({ success: true, signature: sig, asset: assetSigner.publicKey });
  } catch (e: any) {
    console.error("Mint error:", e);
    return NextResponse.json({ error: e?.message ?? "Mint failed" }, { status: 500 });
  }
}
