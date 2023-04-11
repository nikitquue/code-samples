import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
  query allCharacters($offset: Int, $first: Int, $orderBy: String) {
    allCharacters(offset: $offset, first: $first, orderBy: $orderBy) {
      edges {
        node {
          id
          name
          description
          notes
        }
      }
      totalCount
    }
  }
`;
