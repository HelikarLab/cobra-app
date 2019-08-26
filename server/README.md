 # Flux Balance Analysis
Web Pipeline For Flux Balance Analysis (Constraint Based Model)


- This directory contains all the server side code

## Repository Structure

```
 |- server              -> Contains the code of the node server
    |- routes           -> API routes
    |- controllers      -> API controllers
    |- models           -> Sequelize(SQL) models
    |- config           -> Configuration files for the database
    |- pythonScripts    -> Python scripts for parsing and analysing models
    |- scripts          -> scripts to handle backend architecture
```

- You have to setup an environment file (.env) with appropriate variables, an example .env would look like this:

  ```js
  SERVER_PORT = /* Specifiy a port here (Optional) */
  DB_NAME = /* Your database name */
  DB_USER = /* Your database user */
  DB_PASSWORD = /* Your database user's password */
  DB_HOST = /* Your database host (Optional) */
  ```
  - ` TO REMOVE DATA FROM DATABASE OR TO RESYNC THE DATABSE, REMOVE COMMENT "db.sync({force: true})" ` in `index.js`
