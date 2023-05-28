import { gql } from '@apollo/client';

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      email
      name
      role {
        name
      }
      image
    }
  }
`;

const GET_USERS = gql`
  query Users {
    users {
      id
      createdAt
      email
      role {
        name
      }
    }
  }
`;

const UPSERT_USER = gql`
mutation Mutation($email: String!, $roleName: String!) {
  upsertUserRol(email: $email, roleName: $roleName) {
    email
    role {
      name
    }
  }
}
`;

export { GET_USER, GET_USERS, UPSERT_USER };