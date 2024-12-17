# Swift Toucan Stage 
FROM swift:amazonlinux2 AS toucan

RUN yum install -y git && git clone --depth 1 https://github.com/toucansites/toucan
WORKDIR /toucan
RUN swift build -c release --static-swift-stdlib

# NodeJS Stage
FROM public.ecr.aws/amazonlinux/amazonlinux:2023

# Install toucan
COPY --from=toucan /toucan/.build/release/toucan-cli /usr/local/bin/toucan

# Install GIT and Node.js 23
RUN curl -fsSL https://rpm.nodesource.com/setup_23.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
		dnf install -y git nodejs && \
		node -v

# Set working directory
WORKDIR /build

# Set default command
ENTRYPOINT ["/bin/bash"]
