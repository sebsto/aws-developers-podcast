
This is the source code for the AWS Developers Podcast
https://developers.podcast.go-aws.com/web/podcasts/index.html

This project uses NodeJS, Webpack, and SaSS to generate the build directory. Then, we use the Toucan web site generator to build the final web site with actual content.

> [!IMPORTANT] 
> Any change to `index.html` must manually be reported to Toucan's template files (`'.mustache` file)

## Build procedure

### Phase 1 - WebPack 

Node version used is `23.3.0` as indicated by the .nvmrc file.

#### Install dependencies 

`npm i`

#### Scripts

`npm start` - Use for running webpack and opening a live server for development (optional).

`npm run build` - Use to just create a distribution in the `build` folder.

`npm run copy` - To copy the assets file to the static web site generator asset's directory.

### Phase 2 - Integrate content 

> [!IMPORTANT] 
> `index.html` was manually split to `mustache` template files.
> Any changes to `index.html` must be reported manually to the corresponding `.mustache` files in the `toucan/themes/aws_podcasts` directory

> [!NOTE]
> To install `toucan`: 
> 1. be sure [a Swift compiler](https://www.swift.org/install/linux/) is installed on your machine
> 2. `git clone https://github.com/toucansites/toucan`
> 3. `cd toucan && sudo make install`

#### Build the final web site 

`make serve` - Use to generate the final web site with actual content.

```sh
toucan generate ./toucan ./dist
```

#### Deploy 

Copy the content of the `./dist` directory to your web server.

## Test AWS CodeBuild locally 

### Pull the CodeBuild local agent

`docker pull amazon/aws-codebuild-local`

### Run the build

First time: 
```sh 
# build the custom codebuild container
docker build . -t adp:latest
# Get the codebuild agent
docker pull amazon/aws-codebuild-local
# get the script to launch the build
curl -O  https://raw.githubusercontent.com/aws/aws-codebuild-docker-images/master/local_builds/codebuild_build.sh
```

Run the build:
```sh
./codebuild_build.sh -i adp:latest -a temp
```

