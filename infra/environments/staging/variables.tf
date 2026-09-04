variable "aws_region" {
  description = "AWS region for the Festival staging environment."
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the Festival staging VPC."
  type        = string
  default     = "10.0.0.0/16"
}