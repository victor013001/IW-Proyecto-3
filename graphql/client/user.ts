import { gql } from '@apollo/client';

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      email
      name
      role {
        name
      }
    }
  }
`;

export { GET_USER };