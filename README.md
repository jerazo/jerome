# Jerome Erazo: Personal Website

Professional portfolio/service site built with:

- React + TypeScript (Vite)
- Tailwind CSS
- Zustand
- React Router
- Atomic design folder structure (`src/components/atoms|molecules|organisms`)

## Run

```bash
npm install
npm run dev
```

## Edit Content

- Profile + experience: `src/content/profile.ts`
- Services: `src/content/services.ts`
- Headshot image used in the hero: `public/jerome-headshot.png`

## Design System Notes (UI/UX Pro Max)

- Global: `design-system/jerome-erazo/MASTER.md`
- Home overrides: `design-system/jerome-erazo/pages/home.md`

## Deploy to AWS

The site is a static Vite build on **S3 + CloudFront**. The contact form runs on **Lambda** behind **API Gateway**, routed through CloudFront at `/api/contact` (same origin as the SPA).

### Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured (`aws sts get-caller-identity`)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting-started.html) bootstrapped in your account:

```bash
cd infrastructure
npm install
npx cdk bootstrap
```

- ClickUp credentials in your shell (or `.env.local` sourced before deploy)

### First deploy

```bash
export CLICKUP_API_TOKEN=pk_...
export CLICKUP_LIST_ID=...

npm run deploy
```

This will:

1. Deploy the CDK stack (`JeromeStack`) and write `cdk-outputs.json`
2. Build the frontend, sync `dist/` to S3, and invalidate CloudFront

### Subsequent deploys

```bash
# Infra changes only (Lambda env, CloudFront, etc.)
npm run deploy:infra

# Frontend/content changes only
npm run deploy:site
```

### Outputs

After `deploy:infra`, check `cdk-outputs.json` for:

- `SiteUrl` — public CloudFront URL
- `SiteBucketName` — S3 bucket for static assets
- `DistributionId` — CloudFront distribution
- `ContactApiUrl` — contact endpoint (same domain)

The frontend defaults to `POST /api/contact`, so no `VITE_CONTACT_API_URL` is needed when served from CloudFront.

### Versioning

- App version lives in `package.json` (`1.0.0` semver)
- Each build injects git commit + timestamp into the bundle and writes `dist/version.json`
- Footer shows `v{version} · {commit}` (e.g. `v1.0.0 · a1b2c3d`)
- Check current build metadata locally: `npm run version:info`
- Deployed builds expose `https://<your-domain>/version.json`

### Custom domain (optional)

Add an ACM certificate in `us-east-1`, then extend `infrastructure/lib/jerome-stack.ts` with `domainNames` and `certificate` on the CloudFront distribution.

## GitHub Actions deploy

Pushes to `main` run `.github/workflows/deploy.yml`:

1. Deploy CDK when `infrastructure/`, `lambda/`, or `server/` change (or via manual **Run workflow** with **Deploy CDK infrastructure** checked)
2. Build the site, sync `dist/` to S3, and invalidate CloudFront

Pull requests and pushes also run `.github/workflows/ci.yml` (lint, build, CDK synth).

### One-time AWS setup

1. Bootstrap CDK in your account/region:

```bash
cd infrastructure
npm install
npx cdk bootstrap
```

2. Create the GitHub OIDC deploy role (once per account):

```bash
npm run deploy:oidc --prefix infrastructure
```

Copy the `GitHubActionsRoleArn` output.

3. Deploy the site stack once locally (or trigger the workflow with **Deploy CDK infrastructure**):

```bash
export CLICKUP_API_TOKEN=pk_...
export CLICKUP_LIST_ID=...
npm run deploy:infra
```

### GitHub repository configuration

Add these **repository secrets**:

| Secret | Value |
|---|---|
| `AWS_ROLE_ARN` | `GitHubActionsRoleArn` from the OIDC stack (recommended) |
| `CLICKUP_API_TOKEN` | ClickUp personal API token |
| `CLICKUP_LIST_ID` | ClickUp list ID for contact form tasks |

Alternatively, instead of `AWS_ROLE_ARN`, you can use long-lived keys:

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key with deploy permissions |
| `AWS_SECRET_ACCESS_KEY` | Matching secret key |

Optional **repository variable**:

| Variable | Value |
|---|---|
| `AWS_REGION` | AWS region (defaults to `us-east-1`) |

After the first successful deploy, every push to `main` updates the live site automatically.

