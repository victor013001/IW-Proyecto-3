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

export {CREATE_MOVEMENT};