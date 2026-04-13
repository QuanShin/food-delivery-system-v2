aws_region   = "us-east-1"
project_name = "food-delivery"
environment  = "dev"

vpc_cidr             = "10.0.0.0/16"
public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
private_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]
availability_zones   = ["us-east-1a", "us-east-1b"]

eks_version         = "1.31"
node_instance_types = ["t3.medium"]
desired_size        = 2
min_size            = 2
max_size            = 3

db_name     = "foodauthdb"
db_username = "admin"
db_password = "Admin12345!"