variable "aws_region" {
  description = "AWS region for the Festival production environment."
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the Festival production VPC."
  type        = string
  default     = "10.0.0.0/16"
}