terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Remote Backend Configuration
  backend "s3" {
    bucket       = "fitzone-terraform-state-2026"
    key          = "fitzone/terraform.tfstate"
    region       = "us-west-2"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "us-west-2"
}

# ==========================================
# RESOURCE 1: FITZONE S3 BUCKET
# ==========================================

resource "aws_s3_bucket" "fitzone" {
  bucket = "fitzone-suphin-2026"
}


# ==========================================
# RESOURCE 2: S3 PUBLIC ACCESS BLOCK
# ==========================================

resource "aws_s3_bucket_public_access_block" "fitzone" {
  bucket = aws_s3_bucket.fitzone.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


# ==========================================
# RESOURCE 3: S3 BUCKET POLICY
# ==========================================

resource "aws_s3_bucket_policy" "fitzone" {
  bucket = aws_s3_bucket.fitzone.id

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"

        Principal = {
          Service = "cloudfront.amazonaws.com"
        }

        Action = "s3:GetObject"

        Resource = "${aws_s3_bucket.fitzone.arn}/*"

        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::254618531962:distribution/E2FPM31ST6OX0Z"
          }
        }
      }
    ]
  })
}


# ==========================================
# RESOURCE 4: CLOUDFRONT ORIGIN ACCESS CONTROL
# ==========================================

resource "aws_cloudfront_origin_access_control" "fitzone" {
  name                              = "Fitzone-s3-OAC"
  description                       = ""
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}



# ==========================================
# RESOURCE 5: CLOUDFRONT DISTRIBUTION
# ==========================================

resource "aws_cloudfront_distribution" "fitzone" {

  # General Configuration
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront CDN for FitZone React Website"
  default_root_object = "index.html"

  aliases = [
    "www.fitzone-demo.site",
    "fitzone-demo.site"
  ]

  price_class  = "PriceClass_All"
  http_version = "http2and3"

  # S3 Origin Configuration
  origin {
    domain_name = aws_s3_bucket.fitzone.bucket_regional_domain_name

    origin_id = "fitzone-suphin-2026.s3.us-west-2.amazonaws.com-mr614hy4bd4"

    origin_access_control_id = aws_cloudfront_origin_access_control.fitzone.id

    connection_attempts = 3
    connection_timeout  = 10
  }

  # Default Cache Behavior
  default_cache_behavior {
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    target_origin_id = "fitzone-suphin-2026.s3.us-west-2.amazonaws.com-mr614hy4bd4"

    viewer_protocol_policy = "redirect-to-https"

    compress        = true
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  # React SPA Custom Error Responses
  custom_error_response {
    error_code            = 403
    response_page_path    = "/index.html"
    response_code         = "200"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_page_path    = "/index.html"
    response_code         = "200"
    error_caching_min_ttl = 0
  }

  # Geographic Restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  # SSL Certificate Configuration
  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:254618531962:certificate/e8029e8a-1e87-4945-a9ab-88e279e3425d"

    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # Existing AWS WAF Association
  web_acl_id = "arn:aws:wafv2:us-east-1:254618531962:global/webacl/CreatedByCloudFront-a0c4476e/6d2892d8-ebdb-4016-8d67-6cf2dacf3fc3"

  tags = {
    Name = "fitzone-cdn"
  }
}

