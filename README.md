# Documentation for Distributed Mechanism

## Overview
The Distributed Mechanism is a microservices-based application designed to facilitate distributed services using PostgreSQL as the database. This application is built with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Getting Started

### Prerequisites
- Node.js (version 20 or higher)
- Docker (for containerization)
- PostgreSQL (version 13.20 or higher)

### Installation
1. Clone the repository:
```bash
git clone git@github.com:5-stages/hze-api.git
cd distributed-mechanism
```

2. Install dependencies:
```bash
yarn install
```
3. Set up environment variables:
Create a `.env` file in the root directory and define the following variables:
```
NODE_ENV=development
CLIENT_URL=http://localhost:3000
HOST=localhost
PORT=3000
PROTOCOL=http
BASE_PATH=api
DB_USER=<your_db_user>
DB_PASS=<your_db_password>
DB_HOST=localhost
DB_NAME=distributed-services
DB_SSL_ENABLED=false
```

### Database
Before running the application you need to initiate the DB. The HzE API uses PostgreSQL as the DB.

Use this command to run the DB inside Docker container (you need to run it inside the root of this repository):

```
docker-compose up -d --build
```


### Running the Application
To start the application in development mode, run:

```bash
yarn start:dev
```
