- Create a postgres database named peopledb, or modify connectionstring in backend/src/dbconfig/dbconnector.ts
- Create table called people_table
  CREATE TABLE people_table(ID SERIAL PRIMARY KEY NOT NULL, FIRST_NAME TEXT NOT NULL, LAST_NAME TEXT NOT NULL, AGE INT NOT NULL);
  Modify connectionstring to contain your postgres user information.

- Navigate to /backend and run npm install, then start the backend with npm start
- Navigate to /frontend/react-typescript-front and run npm install, then start the front with npm start

REST has the capability to get a single person by id, but the front does not use this feature.
can be tested with curl http://localhost:4000/people/{id}
