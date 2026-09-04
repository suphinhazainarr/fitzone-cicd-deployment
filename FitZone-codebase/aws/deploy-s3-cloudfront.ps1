param(
  [string]$StackName = "fitzone-static-site",
  [string]$ProjectName = "fitzone",
  [string]$Region = "us-east-1"
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Template = Join-Path $PSScriptRoot "cloudformation-static-site.yml"
$Dist = Join-Path $Root "dist"

Set-Location $Root

Write-Host "Building FitZone..."
pnpm install --frozen-lockfile
pnpm build

Write-Host "Creating or updating AWS stack $StackName in $Region..."
aws cloudformation deploy `
  --stack-name $StackName `
  --template-file $Template `
  --region $Region `
  --parameter-overrides ProjectName=$ProjectName

$BucketName = aws cloudformation describe-stacks `
  --stack-name $StackName `
  --region $Region `
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" `
  --output text

$DistributionId = aws cloudformation describe-stacks `
  --stack-name $StackName `
  --region $Region `
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" `
  --output text

$CloudFrontUrl = aws cloudformation describe-stacks `
  --stack-name $StackName `
  --region $Region `
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDomainName'].OutputValue" `
  --output text

Write-Host "Uploading static assets to s3://$BucketName..."
aws s3 sync $Dist "s3://$BucketName" `
  --delete `
  --exclude "index.html" `
  --cache-control "public,max-age=31536000,immutable" `
  --region $Region

aws s3 cp (Join-Path $Dist "index.html") "s3://$BucketName/index.html" `
  --cache-control "no-cache,no-store,must-revalidate" `
  --content-type "text/html" `
  --region $Region

Write-Host "Invalidating CloudFront cache..."
aws cloudfront create-invalidation `
  --distribution-id $DistributionId `
  --paths "/*" `
  --region $Region | Out-Null

Write-Host "Deployment complete: $CloudFrontUrl"
