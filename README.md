# SwapSeek

## Build the Docker image and start the container

docker-compose up --build

## Start the container in detached mode (runs in the background)

docker-compose up -d

## Stop the container

docker-compose down

## Stop the container and remove the Docker image

docker-compose down --rmi all

## Check container logs

docker logs -f node-cron-container
