import gql from "graphql-tag";
export const updateUserMutate = gql `
    mutation updateUserMutate ($id: ID!, $email: String!, $firstName: String!, $lastName: String!){
        updateUser(id: $id, email: $email, firstName: $firstName, lastName: $lastName) {
            id
            email
            firstName
            lastName
        }
    }
`;
