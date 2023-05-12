import { gql } from 'graphql-tag';

const typeDefs = gql`

  scalar DateTime

  type Role {
    id: ID
    name: String
    users: [User]
  }

  type User {
    id: ID
    name: String
    email: String
    image: String
    createdAt: DateTime
    role: Role
    materials: [Material]
    movements: [Movement]
  }

  type Material {
    id: ID
    name: String
    createdAt: DateTime
    createBy: User
    movements: [Movement]
  }

  type Movement {
    id: ID
    input: Int
    output: Int
    createdAt: DateTime
    createBy: User
    material: Material
  }

  type Query {
    user(email: String!): User
    users: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createMaterial(name: String!, input: Int!): Material
  }
`;

export { typeDefs }