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

1. Bootstrap CDK in your account/region (once per account/region; the Deploy workflow runs this automatically):

```bash
cd infrastructure
npm install
npx cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

Or from the repo root after AWS CLI credentials are configured:

```bash
npm run bootstrap:infra
```

2. Create the GitHub OIDC deploy role (once per account):

```bash
npm run deploy:oidc --prefix infrastructure
```

Copy the `GitHubActionsRoleArn` output.

3. Deploy the site stack once locally (or re-run the Deploy workflow — it auto-deploys infra when `JeromeStack` is missing):

```bash
export CLICKUP_API_TOKEN=pk_...
export CLICKUP_LIST_ID=...
npm run deploy:infra
```

The Deploy workflow also bootstraps CDK automatically before the first `JeromeStack` deploy.

### GitHub environment configuration

Deploy jobs use the **`jerome`** GitHub Environment. Configure it under **Settings → Environments → jerome**.

**Environment secrets**

| Secret | When needed |
|---|---|
| `AWS_ROLE_ARN` | OIDC deploys (`AWS_AUTH_METHOD` unset or `oidc`) |
| `AWS_ACCESS_KEY_ID` | Only when `AWS_AUTH_METHOD=access-keys` |
| `AWS_SECRET_ACCESS_KEY` | Only when `AWS_AUTH_METHOD=access-keys` |

Do **not** configure both OIDC and access keys at once. The workflow uses one method only.

The deploy IAM principal still needs permission to create **S3**, **IAM roles**, and **SSM parameters** for the first bootstrap. This project uses a **minimal bootstrap template without ECR**, so `ecr:CreateRepository` is not required.

**Environment variables**

| Variable | Value |
|---|---|
| `AWS_AUTH_METHOD` | `oidc` (default) or `access-keys` |
| `AWS_REGION` | e.g. `us-east-1` |
| `NODE_VERSION` | e.g. `24` |
| `CLICKUP_API_TOKEN` | ClickUp personal API token (prefer moving to secrets) |
| `CLICKUP_LIST_ID` | ClickUp list ID for contact form tasks |
| `SITE_BUCKET_NAME` | Optional override if CloudFormation lookup is unavailable |
| `CLOUDFRONT_DISTRIBUTION_ID` | Optional override for site deploy |
| `SITE_URL` | Optional public site URL for deploy logs |

**OIDC setup**

1. Run `npm run deploy:oidc --prefix infrastructure` locally
2. Add the `GitHubActionsRoleArn` output as `AWS_ROLE_ARN` in the `jerome` environment
3. Leave `AWS_AUTH_METHOD` unset (defaults to OIDC)
4. Remove `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from the environment if present

The IAM role must trust `repo:jerazo/jerome:environment:jerome` (included in the current OIDC stack).

After the first successful deploy, every push to `main` updates the live site automatically.

