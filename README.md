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
Pull the latest version

```bash
$ git fetch
$ git pull
```
Switch to the latest branch
```
$ git checkout {branch-name}
```
Example
```
$ git checkout feature/buyer-cruds
```

### Migrate Tables

```bash
$ npx sequelize-cli db:migrate
```

**Create a new System Admin User:**
- Open PGAdmin
- Right click on `database_development` > Query Tool
- Copy and execute the following query:

```sql
INSERT INTO "Users" ("email", "password", "accountType", "isLoggedIn", "createdAt", "updatedAt")
VALUES('jd@gmail.com', '1234', 'systemadmin', false, NOW(), NOW())
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

### Connect client

Open your browser and navigate to
```
http://localhost:3000
```

### Login and seed first profile

At the login page, enter the following:
Email: jd@gmail.com
Password: 1234
AccountType: System Administrator

Page will complain about missing profile
Navigate to the following URL:
```
http://localhost:3000/systemadmin/view/account/1
```
Create a new profile, input random data

Now you should be able to use the app

