# book-rental-demo

command to run the backend server 
```
npm start
```
This npm script is configured to run a locally/globally installed nodemon(node monitor) that auto restarts node on any changes in files within the server folder

Alternatively you can use the command

```
nodemon -w server
```
to achieve the same effect

-w flag takes a glob pattern to watch for any changes 
nodemon will automatically pickup "main" property from package.json and run 
```
nodemon -w server/**/*.js server/server.js
```

## This project needs a PostgresSQL database server to store and query data

The dump for the database is provided in ```server/extras/dbDump.sql```
in directory ```<Postgres Installation Dir>\bin``` run the ```pg_ctl``` start command as shown below
On my system example Postgres is installed in F:\PostgreSQL13
```
cd "F:\PostgreSQL13\bin"
F:
pg_ctl -D "F:\PostgreSQL13\data" start
```

## frontend
Client directory stores frontend React code
To start a development server that will watch the UI code for changes and restart automatically and uses the create-react-app template and toolchain setup
```
cd client
npm start
```

## Upcoming:
1) DB Design Doc with Diagram
2) Complete UI (Currently UI just has search feature) and only API exposed provides issue and return features

