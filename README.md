# book-rental-demo

backend
command to run the backend server
nodemon -w server
OR
npm start
-w flag to watch server directory for any changes and nodemon will automatically pickup main property from package.json and run nodemon -w server/**/*.js server/server.js
TO START database
in directory "\<Postgres Installation Dir>\bin" run the pg_ctl start command as shown below
On my system example Postgres is installed in F:\PostgreSQL13
cd "F:\PostgreSQL13\bin"
F:
pg_ctl -D "F:\PostgreSQL13\data" start
frontend
cd client
npm start