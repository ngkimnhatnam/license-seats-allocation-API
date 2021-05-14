## Database design

- Databse chosen was PostgreSQL, because I want to try out with this DB.
- Considering the business requirements for the application, a database schema is designed as follows:

![database_design](https://i.ibb.co/6wVB9pY/license-db-schema.png)

- Two main resources are materialized into own data tables, which are Licenses, and Seats.
- EPOCH timestamp is used to keep track of the status of the seats allocated, and also used in queries to determine business logic.
