## Country REST API

This is simple REST API for get country from https://countries.trevorblades.com (graphQL). This service implement [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) with [Hexagonal Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>)

## How to run REST API with development mode

1. copy `example.env` into`.env`:

```
cp example.env .env
```

2. run docker compose. it will be run on port :4001

```
docker compose up -d
```

### or

2. run without docker. it will be run on port :4001

```
npm run dev
```

> notes: you can change port at .env file, that you have been copy before

## How to run test

1. execute command below:

```
npm run test
```

## How to run in production

1. first, build the application. compile from `.ts` to `.js`, run command below:

```
npm run build
```

2. after build done. try to run with command below, the command will be run on production:

```
npm run start
```

> notes: or you can run it in background, you can use pm2. PM2 is a daemon process manager that will help you manage and keep your application online 24/7

## Documentation

### C4 Diagram

![C4 Diagram Context](./docs/img/C4%20Diagram.jpg)

### Sequence Diagram For Get Countries

![Sequence Diagram For Get Countries](./docs/img/Get%20Countries%20-%20Sequence%20Diagram.jpg)

### Sequence Diagram For Get Country

![Sequence Diagram For Get Country](./docs/img/Get%20Country%20-%20Sequence%20Diagram.jpg)

### Swagger Open API

<a href="https://bump.sh/zyogo/doc/country-rest-api" target="_blank">Link Swagger</a> or can access from folder `docs/swagger/swagger.yaml`

## Try to hit endpoint

1. Hit endpoint for get countries:

```
curl --location 'http://localhost:4001/countries'
```

2. Hit endpoint for get detail country, try to get detail country for US:

```
http://localhost:4001/country/us
```
