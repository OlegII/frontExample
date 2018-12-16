import gql from "graphql-tag";
export const registerMutate = gql `
    mutation registerMutate ($email: String!, $password: String!){
        register(email: $email, password: $password) {
            token
        }
    }
`;
