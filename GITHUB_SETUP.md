# Linking OnChain CV to GitHub

Follow these exact steps to push your project to a GitHub repo.

---

## Step 1 — Create a GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it `onchain-cv` (or anything you like)
3. Set visibility: Public or Private
4. **Do NOT** initialize with README, .gitignore, or license (the project already has these)
5. Click **Create repository**
6. Copy the repo URL — it looks like:
   `https://github.com/YOUR_USERNAME/onchain-cv.git`

---

## Step 2 — Initialize git (if not already done)

Open your terminal in the project root (`/home/user/onchain-cv`) and run:

```bash
git init
git add .
git commit -m "feat: initial OnChain CV scaffold"
```

---

## Step 3 — Link to your GitHub repo

```bash
git remote add origin https://github.com/YOUR_USERNAME/onchain-cv.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4 — Authenticate (if prompted)

GitHub no longer accepts passwords. Use a **Personal Access Token**:

1. Go to: Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Check `repo` scope
4. Copy the token
5. When prompted for password during `git push`, paste the token

Or use the GitHub CLI:
```bash
gh auth login
```

---

## Step 5 — Deploy to Vercel (recommended for Next.js)

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — done in ~60 seconds
5. Your live URL: `https://onchain-cv.vercel.app`

---

## Future pushes

Every time you make changes:
```bash
git add .
git commit -m "your message"
git push
```

Vercel auto-deploys on every push to `main`.
