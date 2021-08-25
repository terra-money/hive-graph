![logo](./assets/hivegraph_logo.png)

GraphQL interface for Terra blockchain based on [terra.js](https://github.com/terra-money/terra.js)

## Features

- **Written in TypeScript**, with type definitions.
- Based on [terra.js](https://github.com/terra-money/terra.js) LCDClient spec.
- GraphQL **Schema** auto-generate with decorators and TypeScript classes.
- GraphQL **Types** compatible with columbus-4 and columbus-5.
- **LRU** cache for every GraphQL query. 

## Environment setup

 - Install [Node.js](https://nodejs.org/)
   - Recommended method is by using [NVM](https://github.com/creationix/nvm)
   - Recommended Node.js version is v14.17
 - Install [Docker](https://docs.docker.com/get-docker/)

## Get Started

Install all the dependencies:

```
npm ci
```

Copy the `.env.sample` file to `.env`

```
cp .env.sample .env
```

In the project directory, you can run:

### `npm run start:dev`

Runs the NodeJs services in the development mode.\
Open [localhost:8085/graphql](http://localhost:8085/graphql) to view it in the browser or Postman.

The service will reload if you make edits.

## Test

### `npm run test`

Running the unit tests.

### `npm run test:cov`

Running the test coverage.

## License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2021 Terraform Labs, PTE.

<hr/>

<p>&nbsp;</p>
<p align="center">
    <a href="https://terra.money/"><img src="http://terra.money/logos/terra_logo.svg" align="center" width=200/></a>
</p>
<div align="center">
  <sub><em>Powering the innovation of money.</em></sub>
</div>
