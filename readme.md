# Pokemon API
Simple API for testers to practise automatic tests

## Requirements
Docker and docker-compose installed on machine

## Setup

### Build docker image and run project
Run docker compose in root directory
```shell
$ docker-compose up -d
```
### Initialize database
Exec those command in app-container
```shell
$ npx prisma migrate dev
$ npx prisma db seed
```

## Usage
- API is available under localhost:3000
- Swagger: localhost:3000/api-docs
- Prisma studio: localhost:5555


You can verify if project is running and if database is initialized properly
by requesting list of pokemons. For example with curl.
```shell
$ curl localhost:3000/pokemon
```
If setuped correctly You should receive list of first 10 pokemons from pokedex.
