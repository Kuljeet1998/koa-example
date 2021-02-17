1. app.js -> main file to be executed
2. books.js -> testing routing w/o db connection
3. config.json -> contains sensitive information about the db (similar to secrets.json from django)
4. db.js -> has a database connection which has User, MyGuests & Token as tables
         -> has CRUD for MyGuests
5. token_validation.json -> function written to check if logged in user (header: authorisation token) is legitimate or print error accordingly
6. tokens.js -> contains simple GET API to print all users along w their tokens (no authorisation required)
7. users.js -> contains user CRUD wherein token is created when POST of user is executed.

All APIs require token auth unless specified otherwise.