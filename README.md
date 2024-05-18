# Real Estate System (CSIT314 Group Project)

This is the repository for Group `Grad2025`'s real estate system project.

## Installation

### Prerequisites

- git
- Node.js (latest)
- PostgreSQL (latest)

### Create Database

Create a new database in PostgreSQL using PGAdmin called `database_development`

### Clone this repository

```bash
$ git clone git@github.com:CSIT314-Grad2025/real-estate-system.git
$ cd real-estate-system
```
Or if you already have the repository, open GitBash inside the repository

Pull the latest version

```bash
$ git fetch
$ git pull
```
Switch to the latest branch
```
$ git checkout feature/user-profiles
```

### Migrate Tables

```bash
$ npx sequelize-cli db:migrate
```
### Install and start back-end

```bash
$ npm install
$ npm run server
```
Keep this terminal window running

### Install and start front-end

Open a new terminal window in the root directory

```bash
$ cd frontend
$ npm install
$ npm start
```

### Seed the first System Admin User into the database

```
$ npx sequelize-cli db:seed:all
```

### Connect client

Open your browser and navigate to
```
http://localhost:3000
```

At the login page, enter the following:
Email: jd@gmail.com
Password: 1234
AccountType: System Administrator

