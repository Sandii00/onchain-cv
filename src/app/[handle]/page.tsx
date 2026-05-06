import PublicProfile from "@/components/PublicProfile";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: `${handle} — OnChain CV`,
    description: `View ${handle}'s verified on-chain identity on Solana.`,
    openGraph: {
      title: `${handle} — OnChain CV`,
      description: `Verified Solana wallet identity for ${handle}`,
      type: "profile",
    },
  };
}

export default async function HandlePage({ params }: Props) {
  const { handle } = await params;
  return <PublicProfile handle={handle} />;
}
