import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }    
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }
        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }
    `,
    resolvers: {
        Todo: {
            user: async (todo) => {
                console.log(todo)
              return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data;
            },
          },
      Query: {
        getTodos: async () =>
          (await axios.get(`https://jsonplaceholder.typicode.com/todos`)).data,
        getAllUsers: async () =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users`)).data,
        getUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });
  const port = "8000";
  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`App start at port: ${port}`);
  });
}
startServer();
