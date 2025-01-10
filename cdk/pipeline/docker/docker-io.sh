[[ ! -f env.sh ]] && (echo "env.sh file not found"; exit 1)
. ./env.sh
# env.sh defines 
# AWS_PROFILE
# AWS_REGION
# AWS_ACCOUNT

docker build --platform linux/amd64 . -t sebsto/adp:x64
docker push sebsto/adp:x64