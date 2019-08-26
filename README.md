 # Flux Balance Analysis
 Web Pipeline For Flux Balance Analysis (Constraint Based Model). 
 
 This repository was created as a part of Google Summer of Code 2019.
                
## To start the application

This application makes use of docker and docker compose, so first install them. Learn more about this [here](https://www.docker.com/get-started).

Run the following commands to start the application:

```bash
docker-compose build
docker-compose up
```

- Incase you run into errors and want to stop the network:

    `docker-compose down`
    - It will stop containers and removes containers, networks, volumes, and images created by 
`docker-compose up.`




After this open up a browser and go to http://localhost:3000

## Repository Structure

```
 |- client              -> Contains the code of the react client
    |-cypress           -> Unit tests for UI
    |- src              -> Source files of the react client
        |- assets       -> Images
        |- components   -> React components
        |- store        -> State Management store
 |- server              -> Contains the code of the node server
    |- routes           -> API routes
    |- controllers      -> API controllers
    |- models           -> Sequelize(SQL) models
    |- config           -> Configuration files for the database
    |- pythonScripts    -> Python scripts for parsing and analysing models
    |- scripts          -> scripts to handle backend architecture
 |- docker-compose.yml  -> Docker Compose files that runs the application using docker
 |- package.json        -> The main package.json governing the yarn workspaces
 |- README.md           -> The main documentation file. Also this file :)
```

## Development

Follow the instructions below to get the app up and running in development:

- You need Node & Yarn to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com). Further you also need a server of a postgresql database running. Learn more about postgresql [here](https://www.postgresql.org/).

- First you will need to install the dependencies of the project. Do that by running this:

  - For the client

    ```bash
    cd client
    yarn
    ```

  - For the server

    ```bash
    cd server
    yarn
    ```

- Next you have to setup an environment file (.env) with appropriate variables in the /server folder, an example .env would look like this:

  ```js
  SERVER_PORT = /* Specifiy a port here (Optional) */
  DB_NAME = /* Your database name */
  DB_USER = /* Your database user */
  DB_PASSWORD = /* Your database user's password */
  DB_HOST = /* Your database host (Optional) */
  ```

- Then run the following command to start both the React Client and Node Server(concurrently):

  ```bash
  yarn dev
  ```
- To run unit tests:
    - You can change configuration of cypress in `client/cypress.json`
    
  ```bash
  cd client
  yarn run cypress open
  ```

- You can download a SBML file from the following link incase you don't have a file which is formatted for constraint based models(FBA models).

   - [Zhuang2011 - Ecoli FBA with membrane economics](https://www.ebi.ac.uk/biomodels/MODEL1105030000#Files)
