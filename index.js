const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type queries {
          events : [String!]!
        }
        type mutations {
          createEvent(name : String) : String!
        }
        schema {
          query : queries
          mutation : mutations
        }
    `),
    rootValue: {
      events: () => {
        return ["Hello", "Web developer", "Electrical Engineer"];
      },
      createEvent: (args) => {
        return args.name;
      },
    },
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});
