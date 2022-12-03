import { gql } from "@apollo/client";

const CHAT_SUBSCRIPTION = gql`
  subscription MessageCreated {
    messageFeed {
      message
      createdAt
      user {
        username
      }
    }
  }
`;

export { CHAT_SUBSCRIPTION };
