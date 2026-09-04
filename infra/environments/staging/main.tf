terraform {
  backend "s3" {
    bucket       = "festival-platform-terraform-state-bucket"
    key          = "staging/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}