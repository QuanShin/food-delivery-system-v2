terraform {
  backend "s3" {
    bucket         = "food-delivery-terraform-state-202077713283"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "food-delivery-terraform-locks"
    encrypt        = true
  }
}