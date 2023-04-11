import { gql } from "@apollo/client";

export const GET_ALL_ORGANISATIONS = gql`
  query allOrganisations {
    allOrganisations {
      totalCount
    }
  }
`;
