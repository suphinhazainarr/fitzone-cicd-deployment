# AWS Deployment

This project is a static Vite React app. The AWS setup in this folder deploys it to a private S3 bucket served through CloudFront.

## Prerequisites

- Node.js and pnpm installed
- AWS CLI installed
- AWS credentials configured with permission to manage CloudFormation, S3, and CloudFront

## Deploy

From the project root:

```powershell
pnpm deploy:aws
```

Optional parameters:

```powershell
powershell -ExecutionPolicy Bypass -File ./aws/deploy-s3-cloudfront.ps1 `
  -StackName fitzone-static-site `
  -ProjectName fitzone `
  -Region us-east-1
```

The script will:

1. Install dependencies from `pnpm-lock.yaml`
2. Build the app into `dist`
3. Create or update the CloudFormation stack
4. Upload `dist` to S3
5. Invalidate CloudFront
6. Print the CloudFront website URL

## Manual Build Only

```powershell
pnpm install --frozen-lockfile
pnpm build
```

After building, the deployable static files are in `dist`.
