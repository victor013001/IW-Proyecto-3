import { gql } from '@apollo/client';


const CREATE_MOVEMENT = gql`
    mutation CreateMovement($name: String!, $input: Int!, $output: Int!) {
        createMovement(name: $name, input: $input, output: $output) {
            input
            output
            id
            createBy {
                email
            }
            material {
                name
            }
        }
}
`;

const GET_MOVEMENTS_BY_NAME = gql`
query Movements($name: String!) {
  movements(name: $name) {
    id
    createdAt
    input
    output
  }
}
`;

export {CREATE_MOVEMENT, GET_MOVEMENTS_BY_NAME};