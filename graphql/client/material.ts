import { gql } from '@apollo/client';

const CREATE_MATERIAL = gql`
  mutation CreateMaterial($name: String!, $input: Int!) {
    createMaterial(name: $name, input: $input) {
      id
      name
      createdAt
    }
  }
`;

export { CREATE_MATERIAL };