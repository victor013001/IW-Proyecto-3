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
    }
  }
`;

export { GET_USER };