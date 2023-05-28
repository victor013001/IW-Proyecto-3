import { gql } from '@apollo/client';

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      id
      email
      name
      image
      role {
        name
      }
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

export { GET_USER, GET_USERS };