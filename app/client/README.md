 # Flux Balance Analysis
Web Pipeline For Flux Balance Analysis (Constraint Based Model)


- This directory contains all the client side code
- The test cases are written using Cypress

## Repository Structure

```
 |- client              -> Contains the code of the react client
    |-cypress           -> Unit tests for UI
        |-integrations  ->  Global Unit tests
            |-Model Tab -> Unit tests for Model Tab
    |- src              -> Source files of the react client
        |- assets       -> Images
        |- components   -> React components
            |- ModelTab      -> React components for ModelTab
            |- Navbar        -> React components for Navbar
            |- SimulationTab -> React components for Simulation Tab
        |- store        -> State management store
```

- To run the test cases, use `yarn run cypress open` inside this directory.
