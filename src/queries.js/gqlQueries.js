import { gql } from "@apollo/client";

const GET_GAMES = gql`
  query getGames {
    games {
      _id
      hash
      bust
    }
  }
`;
const GET_PLAYERS = gql`
  query getPlayers {
    bets {
      _id
      amount
      rate
      user {
        username
      }
    }
  }
`;
const GET_CHATS = gql`
  query getChats {
    chats {
      _id
      message
      createdAt
      user {
        username
      }
    }
  }
`;
const USER_REGISTER = gql`
  mutation userregister(
    $username: String!
    $password: String!
    $phoneNumber: String!
  ) {
    registerUser(
      userInput: {
        username: $username
        password: $password
        phoneNumber: $phoneNumber
      }
    ) {
      token
      userId
    }
  }
`;
const USER_LOGIN = gql`
  mutation userlogin($password: String!, $phoneNumber: String!) {
    loginUser(phoneNumber: $phoneNumber, password: $password) {
      token
      username
    }
  }
`;
const USER_CHAT = gql`
  mutation sendMessage($message: String!) {
    sendMessage(message: $message) {
      message
    }
  }
`;

const BET_PLACE = gql`
  mutation placeBet($amount: Int!, $rate: Float!) {
    placeBet(betInput: { amount: $amount, rate: $rate }) {
      status
      user {
        username
      }
    }
  }
`;
export {
  GET_GAMES,
  GET_PLAYERS,
  GET_CHATS,
  USER_REGISTER,
  USER_LOGIN,
  USER_CHAT,
  BET_PLACE,
};
