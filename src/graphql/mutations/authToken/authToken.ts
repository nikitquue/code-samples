import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
  mutation authToken($email: String!, $password: String!) {
    authToken(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;
