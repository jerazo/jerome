# Jerome Lopez Erazo: Personal Website

Professional portfolio/service site built with:

- React + TypeScript (Vite)
- Tailwind CSS
- Zustand
- React Router
- Atomic design folder structure (`src/components/atoms|molecules|organisms`)

## Atomic component typings

Shared prop contracts live in `src/components/atomic/types.ts`. Every atom imports its props from that file instead of defining inline interfaces.

**Import atoms and types from the barrel**

```tsx
import { Button, PortfolioImage } from '@/components/atomic'
import type { IButtonAtomProps } from '@/components/atomic'
```

`src/components/atomic/index.ts` re-exports all atom components, `buttonClassName` / button style types, and prop interfaces. Prefer this entry point over deep relative paths such as `../atoms/PortfolioImage`. Atoms keep importing prop types from `../atomic/types` internally to avoid circular dependencies.

The `@/*` path alias maps to `src/*` in `tsconfig.app.json` and Vite. The legacy `@atomic/*` alias still resolves files under `src/components/atomic/`.

Base interfaces:

- `AtomProps` — HTML attributes plus an explicit `role` field for accessibility overrides
- `IImageProps` / `IImageAltProps` — image source and required alt text
- `IClickableProps` — clickable controls with optional `label`
- `IImpactMetricProps` — label/value pairs for metric badges

Atom-specific interfaces (for example `IButtonAtomProps`, `INavHashLinkProps`) extend these bases.

**Extend the system**

1. Add or extend an interface in `src/components/atomic/types.ts` with JSDoc describing purpose and expected values.
2. Update the atom to import that interface and remove any local prop types.
3. Add a minimal-props case to `src/tests/atomic/TypeSafety.test.tsx` so compile-time and render checks stay in sync.

Run `npm run lint:types` and `npm test` after changes.

## ESLint atomic structure

Component folder placement and import paths are enforced by the custom ESLint rule `atomic-structure/atomic-component-path`. Categories are defined in `src/config/atomic-structure.json`.

```bash
npm run lint          # check compliance
npm run lint:fix      # auto-fix import paths
npm run lint:atomic:fix  # move misplaced files + fix imports
```

See [`docs/eslint-atomic.md`](docs/eslint-atomic.md) for configuration, exemptions, and plugin details.

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
- **Atomic composition (new contributors):** [`design-system/jerome-erazo/pages/atomic-composition.md`](design-system/jerome-erazo/pages/atomic-composition.md) — how to combine atoms into molecules and organisms with import examples and props.

Validate design-system markdown with `npm run lint:docs`.

## Deploy to AWS

The site is a static Vite build on **S3 + CloudFront**. The contact form runs on **Lambda** behind **API Gateway**, routed through CloudFront at `/api/contact` (same origin as the SPA).

### Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured (`aws sts get-caller-identity`)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting-started.html) bootstrapped in your account:

```bash
cd infrastructure
npm install
AWS_REGION=us-east-1 npm run bootstrap
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

Build metadata is generated from `package.json`, the current git commit, and the build timestamp. Each production build writes `dist/version.json`:

```json
{
  "version": "1.0.0",
  "commit": "a1b2c3d",
  "timestamp": "2026-05-02T13:21:24.000Z"
}
```

The site footer and showcase footer fetch `/version.json` at runtime and display `v{version} · {commit}`. Hover the version text to see the full build timestamp. `scripts/deploy-site.mjs` uploads `version.json` with short cache headers so recruiters always see the latest deployed build.

**Bump the version and redeploy**

1. Update `version` in `package.json` using [semver](https://semver.org/) (e.g. `1.0.0` → `1.1.0`).
2. Commit your changes.
3. Redeploy the frontend:

```bash
npm run deploy:site
```

Or run a local build to refresh `dist/version.json`:

```bash
npm run build
```

**Inspect metadata locally**

```bash
npm run version:info
```

During `npm run dev`, Vite serves a live `/version.json` endpoint. Deployed builds expose `https://<your-domain>/version.json`.

To link the footer version to release notes later, set `releaseNotesUrl` in `src/content/version.ts`.

### Custom domain (optional)

Add an ACM certificate in **us-east-1** that covers your domain(s), then set these GitHub environment variables (or export them for `npm run deploy:infra`):

- `SITE_DOMAIN_NAMES` — comma-separated aliases, e.g. `monx.dev,www.monx.dev`
- `ACM_CERTIFICATE_ARN` — the ACM certificate ARN in `us-east-1`
- `SITE_URL` — canonical public URL, e.g. `https://monx.dev`

CDK applies the certificate and alternate domain names on the CloudFront distribution so infra deploys do not strip console-only SSL settings.

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
AWS_REGION=us-east-1 npm run bootstrap
```

This deploys `bootstrap-minimal.yaml` with CloudFormation directly (no ECR, no `cdk bootstrap` app required).

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
| `CONTACT_ACCESS_OTP_SECRET` | Random secret for OTP signing (`openssl rand -hex 32`) |

Do **not** use `change-me-in-production` in production.

Do **not** configure both OIDC and access keys at once. The workflow uses one method only.

The deploy IAM principal still needs permission to create **S3**, **IAM roles**, and **SSM parameters** for the first bootstrap. This project uses a **minimal bootstrap template without ECR**, so `ecr:CreateRepository` is not required.

**Environment variables**

| Variable | Value |
|---|---|
| `AWS_AUTH_METHOD` | `oidc` (recommended) or `access-keys` |
| `AWS_REGION` | e.g. `us-east-1` |
| `NODE_VERSION` | e.g. `24` |
| `CLICKUP_API_TOKEN` | ClickUp personal API token (prefer moving to secrets) |
| `CLICKUP_LIST_ID` | ClickUp list ID for contact form tasks |
| `NOTIFY_EMAIL` | Where contact-access alerts are sent (default `jerome.erazo@gmail.com`) |
| `SES_FROM_EMAIL` | Verified SES sender (default matches `NOTIFY_EMAIL`) |
| `SITE_BUCKET_NAME` | Optional override if CloudFormation lookup is unavailable |
| `CLOUDFRONT_DISTRIBUTION_ID` | Optional override for site deploy |
| `SITE_URL` | Public site URL (SEO build + Lambda `SITE_URL`) |
| `SITE_DOMAIN_NAMES` | CloudFront CNAMEs, comma-separated (requires `ACM_CERTIFICATE_ARN`) |
| `ACM_CERTIFICATE_ARN` | ACM cert ARN in `us-east-1` for CloudFront custom domain |
| `VITE_MIXPANEL_TOKEN` | Mixpanel project token for client analytics (omit to disable) |

**OIDC setup**

1. Run `npm run deploy:oidc --prefix infrastructure` locally
2. Add the `GitHubActionsRoleArn` output as `AWS_ROLE_ARN` in the `jerome` environment
3. Leave `AWS_AUTH_METHOD` unset (defaults to OIDC)
4. Remove `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from the environment if present

The IAM role must trust `repo:jerazo/jerome:environment:jerome` (included in the current OIDC stack).

### Contact access email (SES + OTP)

The masked contact flow sends OTP codes to visitors and alerts you when someone verifies.

**1. Verify SES in AWS (once per account/region)**

1. Open [Amazon SES](https://console.aws.amazon.com/ses/) in `us-east-1` (same region as deploy).
2. **Verified identities** → **Create identity** → **Email address**.
3. Enter `jerome.erazo@gmail.com` and complete the verification link in your inbox.
4. **Account dashboard** → **Request production access** so OTP emails can go to any visitor address (sandbox only allows verified recipients).

**2. Generate an OTP secret**

```bash
openssl rand -hex 32
```

**3. GitHub environment `jerome`**

| Type | Name | Value |
|---|---|---|
| Variable | `NOTIFY_EMAIL` | `jerome.erazo@gmail.com` |
| Variable | `SES_FROM_EMAIL` | `jerome.erazo@gmail.com` |
| Secret | `CONTACT_ACCESS_OTP_SECRET` | output from `openssl rand -hex 32` |

**4. Deploy infrastructure**

Re-run the **Deploy** workflow (or push infra changes). CDK injects these into the contact Lambda.

**5. Local deploy (optional)**

```bash
cp .env.example .env.local
# edit CLICKUP_* and CONTACT_ACCESS_OTP_SECRET

export $(grep -v '^#' .env.local | xargs)
npm run deploy:infra
```

Preflight check:

```bash
AWS_REGION=us-east-1 bash infrastructure/scripts/verify-ses.sh
```

### Troubleshooting deploy IAM errors

If `cdk deploy` fails with `iam:PassRole` or `sts:AssumeRole` on `cdk-hnb659fds-*` roles, the deploy principal is too limited.

**Recommended fix (OIDC):**

1. Set `AWS_AUTH_METHOD` = `oidc` in the `jerome` environment
2. Keep only `AWS_ROLE_ARN` (from `npm run deploy:oidc --prefix infrastructure`)
3. Remove `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from the environment

The OIDC deploy role uses `AdministratorAccess` and can pass CDK execution roles.

**If you must use access keys:**

Attach `infrastructure/policies/github-actions-deploy-policy.json` to the IAM user, or attach `AdministratorAccess`.

After the first successful deploy, every push to `main` updates the live site automatically.
