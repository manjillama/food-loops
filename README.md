## Project Introduction

**Batsal server** is currently created using Node.js on the top of Express framework and TypeScript. For database, we've decided to go with MongoDB and and Mongoose as an ODM.

## Folder structure

```
|-- migrations        # Database migration dir
|-- tests             # All unit and integration test files goes here
|-- src
    |   app.js        # Load application modules
    |   index.js      # App entry point
    |-- config        # Environment variables and configuration related stuff
    |-- constants     # App constants
    |-- controllers   # Express route controllers for all the endpoints of the app
    |-- interfaces    # TypeScript interfaces
    |-- middlewares   # Express middlewares for endpoints
    |-- models        # Database models
    |-- router        # Express router separating base endpoints
    |-- services      # Services modules for route controllers
    |-- startup       # Split the startup process into modules
    |-- types         # TypeScript types
    |-- utils         # Shared utilities modules
```

## Requirements

- NodeJS >= 12.x
- NPM >= 6.x
- MongoDB >= 4.2

## Setup

First of all, you need to check if you're using the required versions of Node.js and npm <br/>

Then, please follow the instructions below:

### Clone the repository

```bash

# Clone with SSH
$ git clone git@github.com:manjillama/batsal-project.git

# Or with HTTPS
$ git clone https://github.com/manjillama/batsal-project.git
```

### Install dependencies

Go to the root of the repository.

```bash
$ cd api && npm install
```

### Start the application in development mode

```
$ npm run dev
```

### Run tests

```bash
# run test
$ npm run test

# run test in watch mode
$ npm run test:watch
```

### Run debugger

```bash
$ npm run debug
```

### Clear all database documents

```bash
$ npm run seed:delete
```

### Populate database collections with sample documents

```bash
$ npm run seed:import
```

## Configuration

To add custom configuration, go to config folder and update your configuration

```
|-- src
    |-- config
      | ci.ts       # test environment configurations
      | dev.ts      # development environment configurations
      | index.ts    # entry point file for configurations
      | keys.ts     # separates configurations based on project environment
      | prod.ts     # production environment configurations
```

## Contributing guide

Read our [contributing guide](https://github.com/manjillama/batsal-project/blob/master/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.