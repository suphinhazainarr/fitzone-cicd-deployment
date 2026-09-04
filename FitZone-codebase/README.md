# FitZone - Serverless Gym Website

FitZone is a static React + TypeScript website built with Vite. It is ready to deploy to AWS using S3 and CloudFront.

## Local Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The production files are generated in `dist`.

## Deploy to AWS

This repository includes an AWS CloudFormation template and PowerShell deploy script.

Prerequisites:

- AWS CLI installed
- AWS credentials configured
- Permissions for CloudFormation, S3, and CloudFront

Deploy:

```powershell
pnpm deploy:aws
```

See `aws/README.md` for deployment parameters and details.
