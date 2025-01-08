import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

export const schema = createSchema({
    typeDefs: `
    type Query {
      hello: String!
    }
  `,
    resolvers: {
        Query: {
            hello: () => "world",
        },
    },
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
});
