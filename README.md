 # Flux Balance Analysis
 Web Pipeline For Flux Balance Analysis (Constraint Based Model)
                                         
## Development

The app contains two components: The React Client for Frontend 
and the Backend NodeJs server. The react components go are present in the client folder 
whereas the backend modules have independent modules for APIs and Sequelize

> This project uses StandardJS for styling, linting and formatting purposes. Please find more documentation related to that [here](https://standardjs.com/).

Follow the below instructions to get the app up and running:

- You need Node & Yarn to run this application. Download them here - [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com). Further you also need a server of a postgresql database running. Learn more about postgresql [here](https://www.postgresql.org/).

- First you will need to install the dependencies of the project. Do that by running this:

  ```bash
  yarn
  ```

- Next you have to setup an environment file (.env) with the appropriate variables, an example .env would look like this:

  ```js
  SERVER_PORT = /* Specifiy a port here */
  DB_NAME = /* Your database name */
  DB_USER = /* Your database user */
  DB_PASSWORD = /* Your database user's password */
  ```

- Then run the following command to start the React Client and Node server simultaneously:

  ```bash
  yarn dev
  ```

## Other Scripts

- To run the node server independently, use:

  ```bash
  yarn server
  ```

- To run the react client independently, use:

  ```bash
  yarn client
  ```

- To run tests on the react client, use:

  ```bash
  yarn client-test
  ```

- To build a production react client, use:

  ```bash
  yarn client-build
  ```

- To eject the configuartiona and scripts from the react-scripts package, use:

  ```bash
  yarn client-eject
  ```
