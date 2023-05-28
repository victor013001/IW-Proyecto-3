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
const GET_MATERIAL = gql`
  query Material {
    material {
      id 
      name
    }
  }
`;

const GET_MATERIALS_BALANCE = gql`
  query Materials {
    materials {
      id
      createdAt
      name
      balance
    }
  }
`;

export { CREATE_MATERIAL, GET_MATERIALS_BALANCE, GET_MATERIAL };