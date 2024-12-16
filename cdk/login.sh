[[ ! -f env.sh ]] && (echo "env.sh file not found"; exit 1)
. ./env.sh
# env.sh defines 
# AWS_PROFILE
# AWS_REGION
# AWS_ACCOUNT
aws ecr get-login-password --region ${AWS_REGION} --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${AWS_ACCOUNT}.dkr.ecr.eu-central-1.amazonaws.com

# see https://aws.amazon.com/blogs/containers/announcing-remote-cache-support-in-amazon-ecr-for-buildkit-clients/
docker build --platform linux/amd64 . -t adp \
--cache-to mode=max,image-manifest=true,oci-mediatypes=true,type=registry,ref=${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_ECR_REPO_NAME}:cache \
--cache-from type=registry,ref=${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_ECR_REPO_NAME}:cache 

CODEBUILD_IMAGE_ID=$(docker images --filter "reference=adp" -q)

TAG=$(date +%Y%m%d%H%M%S)

docker tag ${CODEBUILD_IMAGE_ID} ${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_ECR_REPO_NAME}:$TAG

docker push ${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${AWS_ECR_REPO_NAME}:$TAG
