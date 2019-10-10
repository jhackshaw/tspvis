---
type: algorithm
solverKey: random
friendlyName: Random
class: exhaustive
defaults:
  showBestPath: false
  evaluatingDetailLevel: 1
  maxEvaluatingDetailLevel: 1
---

When deploying a set of services using docker-compose, it’s a good idea to have a separate repository to avoid cloning all of the code into your production environment.

I finally got [termninja](https://www.term.ninja) set up correctly with continuous integration and docker-compose on digital ocean, and I thought I’d document the setup.

## Production repository

A typical docker-compose project has a ```docker-compose.yml``` at the root of the project, and all of the code for the images as subfolders.

[development folder structure]

This works great for development - it’s easy to set up volumes and edit the code alongside the images. In production, however, it doesn’t make sense to clone the entire repository just to get to the docker-compose.yml file and start services.

The solution I prefer is to have a separate repository set-up, in this case termninja-docker, that contains only the docker-compose.yml and any production specific configuration.

[production folder structure]

## Deployment

With this structure in place, deployments are accomplished using a container registry (like [docker hub](docker.com/hub)). It’s free to use for public images, and easy to push with docker-compose.

The docker-compose.yml in both the development repo and the production repo should be setup to track the container registry.

[tagged docker-compose]


## Building and pushing images

Once the docker-compose.yml file is setup to track the appropriate image from the container registry, building images is simple.

```docker-compose build [service-name]```

Pushing the updated image is equally simple

```docker-compose push [service-name]```

## Pulling latest images

From the production environment, once the production docker-compose.yml is setup to track the container registry images, updating is simple

```docker-compose down```
```docker-compose pull [service-name]```
```docker-compose up```


All of this seems very intuitive, but I’ve come across several projects where deployments are setup to:
clone the development repo
build and start images

This process is time consuming (more downtime) and results in unnecessary code residing on the server.


## Continuous integration

Once this process is in place, I recommend setting up continuous integration to perform these functions automatically on every commit to the master branch in the development repo. 

A simplified travis-ci configuration from [termninja](https://www.term.ninja) is below. It performs the following steps on every commit.
  1. Clone the repository (automatic for travis)
  2. Login to docker hub using credentials provided through the [travis environment](https://www.travis-ci.com/environment) - ```docker login```
  3. Build the services - ```docker-compose build games api```
  4. Push the images - ```docker-compose push games api```
  5. Decrypt private production SSH key*
  6. SSH to production environmnet
  7. Stop services - ```docker-compose down```
  8. Pull updated images - ```docker-compose pull games api```
  9. Start service - ```docker-compose up```

[travis-ci.yml]

*Note that the ssh keys for the production server must be [encrypted](https://travis-ci.com/ssh-keys).


Hopefully this helps someone else as there was less documentation out there than I expected when setting this up. Let me know how it goes below, thanks!

