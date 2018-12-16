import gql from "graphql-tag";
export const loginMutate = gql `
    mutation loginMutate ($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
        }
    }
`;
