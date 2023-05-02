import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    name: String
    email: String
  }

  type Query {
    user(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

export { typeDefs }