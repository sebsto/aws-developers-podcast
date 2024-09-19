#!/bin/sh 
set -e
# set -x

# Usage : upload_episode.sh <episode_id>

# check episode id is provided
if [ -z "$1" ];
then
	echo "Usage : upload_episode.sh <episode_id>"
	exit -1
fi

PODCAST_BUCKET=aws-developers-podcast-media
MEDIA_PREFIX=media
IMG_PREFIX=img

LOCAL_PODCAST=~/Documents/amazon/te/2024/10\ -\ podcast\ US

# check dependency on mwinit
which mwinit > /dev/null
if [ $? != 0 ];
then
    echo 'mwinit must be installed to run this script.\nFollow instructions at https://w.amazon.com/index.php/NextGenMidway/UserGuide#Client_Environment_Setup_.28for_CLI_or_SSH.29'
    exit -1
fi

# check dependency on jq
which jq > /dev/null
if [ $? != 0 ];
then
    echo 'jq must be installed to run this script.'
		exit -1
fi

# check dependency on isengardcli
which isengardcli > /dev/null
if [ $? != 0 ];
then
	echo 'isengardcli must be installed to run this script.\nFollow instructions at https://w.amazon.com/bin/view/Isengard-cli/'
	exit -1
fi

# force user authentication 
# mwinit --fido2

# PODCAST_ACCOUNT=533267385481
# ACCOUNT_ROLE=Admin
# CREDENTIALS=$(curl -s -b ~/.midway/cookie -c ~/.midway/cookie -L -X POST --header "X-Amz-Target: IsengardService.GetAssumeRoleCredentials" --header "Content-Encoding: amz-1.0" --header "Content-Type: application/json; charset=UTF-8" -d "{\"AWSAccountID\": \"$PODCAST_ACCOUNT\", \"IAMRoleName\":\"$ACCOUNT_ROLE\"}" https://isengard-service.amazon.com | jq -r '.AssumeRoleResult |fromjson | .credentials')

# export AWS_ACCESS_KEY_ID="$(echo "$credentials" | jq -r '.accessKeyId')";
# export AWS_SESSION_TOKEN="$(echo "$credentials" | jq -r '.sessionToken')";
# export AWS_SECRET_ACCESS_KEY="$(echo "$credentials" | jq -r '.secretAccessKey')";

# check if media file exists 
FILE=$(find "$LOCAL_PODCAST" -name $1.mp3)

if [ -z "$FILE" ];
then
	echo "Media file $1.mp3 does not exist in $LOCAL_PODCAST."
	exit -1
fi

echo Uploading $1.mp3
aws --profile podcast s3 cp "$FILE" s3://$PODCAST_BUCKET/$MEDIA_PREFIX/$1.mp3

# check if image file exists 
FILE=$(find "$LOCAL_PODCAST" -name $1.png)

if [ -z "$FILE" ];
then
	echo "Image file $1.png does not exist in $LOCAL_PODCAST."
	exit -1
fi

aws --profile podcast s3 cp "$FILE" s3://$PODCAST_BUCKET/$IMG_PREFIX/$1.png

