import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

// Demo users
const users = [
    { id: 1, name: "John Doe", email: "john@doe.com" },
    { id: 2, name: "Jane Doe", email: "jane@doe.org" },
    { id: 3, name: "Alice Bob", email: "alice@bob.net" },
];

const posts = [
    {
        id: 1,
        title: "Hello, World!",
        content: "This is my first post.",
        published: true,
    },
    {
        id: 2,
        title: "GraphQL is awesome!",
        content: "I just learned about GraphQL.",
        published: true,
    },
    {
        id: 3,
        title: "Goodbye, World!",
        content: "Time to say goodbye.",
        published: false,
    },
];

export const schema = createSchema({
    typeDefs: `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      me: User!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      content: String!
      published: Boolean!
    }
  `,
    resolvers: {
        Query: {
            me() {
                return users[0];
            },
            users(parent, args, ctx, info) {
                if (!args.query) {
                    return users;
                }

                return users.filter((user) => {
                    return user.name
                        .toLowerCase()
                        .includes(args.query.toLowerCase());
                });
            },
            posts(parent, args, ctx, info) {
                if (!args.query) {
                    return posts;
                }

                return posts.filter((post) => {
                    const isTitleMatch = post.title
                        .toLowerCase()
                        .includes(args.query.toLowerCase());
                    const isContentMatch = post.content
                        .toLowerCase()
                        .includes(args.query.toLowerCase());
                    return isTitleMatch || isContentMatch;
                });
            },
        },
    },
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
});
