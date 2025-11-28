
# Tirian Trains 

This project is deployed on Vercel at [24 Chicken Tirian Trains] (https://csci41-tiriantrains.vercel.app/)

---
## ⚙️ Setup
Instructions for setting up the project locally.

### 1) Prerequisites
- **Node.js**: v20 LTS (recommended)
- **npm**: comes with Node.js
- **PostgreSQL** 14+ (local or cloud)

Verify versions:
```powershell
node -v
npm -v
```

### 2) Clone the Repository

```bash
# Clone repo
git clone https://github.com/KinoDT05/csci41-tiriantrains
```

### 3) Install dependencies
```bash
npm install
```

### 4) Environment variables
Create a `.env` file in the project root and paste this:
```env
# Created by Vercel CLI
DATABASE_URL="postgres://21f260c60fcec87f06a8d162d38f400851bc8a6c671f49f90e7bccb08394b45f:sk_fkKq18ChxQLa3dMQWoUTK@db.prisma.io:5432/postgres?sslmode=require"

POSTGRES_URL="postgres://21f260c60fcec87f06a8d162d38f400851bc8a6c671f49f90e7bccb08394b45f:sk_fkKq18ChxQLa3dMQWoUTK@db.prisma.io:5432/postgres?sslmode=require"

PRISMA_DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19ma0txMThDaHhRTGEzZE1RV29VVEsiLCJhcGlfa2V5IjoiMDFLQURBSko0RVZBOUo0UjlCWDBYM01IUUUiLCJ0ZW5hbnRfaWQiOiIyMWYyNjBjNjBmY2VjODdmMDZhOGQxNjJkMzhmNDAwODUxYmM4YTZjNjcxZjQ5ZjkwZTdiY2NiMDgzOTRiNDVmIiwiaW50ZXJuYWxfc2VjcmV0IjoiNjI3YWU1ODQtMWJiMy00MjEzLTgyNjYtOTU2YTBhNTNjNmI5In0.d5mfOVnENIK8bMaKuq6KCWBxQ7_L0F8LLtWOftKb3kY"

VERCEL_OIDC_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay00MzAyZWMxYjY3MGY0OGE5OGFkNjFkYWRlNGEyM2JlNyJ9.eyJpc3MiOiJodHRwczovL29pZGMudmVyY2VsLmNvbS9raW5vZHQwNXMtcHJvamVjdHMiLCJzdWIiOiJvd25lcjpraW5vZHQwNXMtcHJvamVjdHM6cHJvamVjdDpjc2NpNDEtdGlyaWFudHJhaW5zOmVudmlyb25tZW50OmRldmVsb3BtZW50Iiwic2NvcGUiOiJvd25lcjpraW5vZHQwNXMtcHJvamVjdHM6cHJvamVjdDpjc2NpNDEtdGlyaWFudHJhaW5zOmVudmlyb25tZW50OmRldmVsb3BtZW50IiwiYXVkIjoiaHR0cHM6Ly92ZXJjZWwuY29tL2tpbm9kdDA1cy1wcm9qZWN0cyIsIm93bmVyIjoia2lub2R0MDVzLXByb2plY3RzIiwib3duZXJfaWQiOiJ0ZWFtX2t5dW01SDVNcFFWOWlFZGNzR2JuQzdYTSIsInByb2plY3QiOiJjc2NpNDEtdGlyaWFudHJhaW5zIiwicHJvamVjdF9pZCI6InByal9pYk9rVnhRalBWWUZ5a1UwdFFXc0tCSVZGbTRiIiwiZW52aXJvbm1lbnQiOiJkZXZlbG9wbWVudCIsInBsYW4iOiJob2JieSIsInVzZXJfaWQiOiJBUEJHdlBaWHVpb3VGS1piOFY0MlpuQlkiLCJuYmYiOjE3NjM1MzE5NzgsImlhdCI6MTc2MzUzMTk3OCwiZXhwIjoxNzYzNTc1MTc4fQ.MLSCfsAn4vPVOJSgwk6FiLimnhfQgnh9cbZjWev-Ej0dOHgKENFKGZc-hpDLO8QhcvWdJlckeSf6UAHjZR1pXw5kN3chPKDH6FLPRbvJPglwMcl2PuMyEPPwTB8nL9UgxlF1O6U6vr_4QzwpZNyRNzgvAIT7H7HNEooYFabiEVTGpWXLRqswFQokwMLtb4gmuSTTAbPrMUsU4QxmRZnHeJ8XZqzNzd-vpfaSFxX2CRJc-05NSZZf36NYqUE6YTrlIYkCQNs2Za_PDVfC_wXciyimaH4h8lwyNL6aNu4z7jaGD2L7pyCQX7rJghXwD2Wyu6WFDvs95VkIZcWvh1bncw"

NEXTAUTH_SECRET="4g7a9xQ2L0vWf43R6MrbhKQ8zQfP0UawCq9b1N5Fj/4="
```

Notes:
- These are exact keys used for local testing. Replace values only if your environment differs.

### 5) Initiate Prisma
```bash
npx prisma generate
```

### 6) Run the app development
```bash
npm run dev
````
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
