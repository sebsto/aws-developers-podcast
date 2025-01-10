[[ ! -f env.sh ]] && (echo "env.sh file not found"; exit 1)
. ./env.sh
# env.sh defines 
# AWS_PROFILE
# AWS_REGION
# AWS_ACCOUNT

# used by AWS Amplify Hosting
REPO_BASE=public.ecr.aws/y1l6y7p6

aws ecr-public get-login-password --region us-east-1 --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${REPO_BASE}

REPO_URI=${REPO_BASE}/sebsto/adp

docker build --platform linux/amd64 . -t adp:x64
docker tag adp:x64 ${REPO_URI}:x64
docker push ${REPO_URI}:x64

docker tag adp:x64 ${REPO_URI}:arm64
docker push ${REPO_URI}:arm64