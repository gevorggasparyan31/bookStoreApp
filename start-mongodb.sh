#!/bin/bash

# Define the name and version of the MongoDB Docker image
MONGODB_IMAGE="mongo:latest"

# Check if the Docker image exists locally
if sudo docker image inspect "$MONGODB_IMAGE" &>/dev/null; then
    echo "MongoDB image already exists."
else
    # Pull the MongoDB image from Docker Hub if it doesn't exist locally
    echo "Pulling MongoDB image..."
    sudo docker pull "$MONGODB_IMAGE"
fi

sudo docker run -d -p 27017:27017 --name my-mongodb "$MONGODB_IMAGE"

# Check if the container is running
if [ "$(sudo docker inspect -f '{{.State.Running}}' my-mongodb 2>/dev/null)" == "true" ]; then
    echo "MongoDB container is running."
else
    echo "Failed to start MongoDB container."
fi
