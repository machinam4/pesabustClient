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
        _id
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

//password queries
const SEND_PHONE = gql`
  mutation sendPhone($phoneNumber: String!) {
    getCode(phoneNumber: $phoneNumber) {
      code
      message
    }
  }
`;
const SEND_CODE = gql`
  mutation sendCode($phoneNumber: String!, $code: String!) {
    confirmCode(phoneNumber: $phoneNumber, code: $code) {
      code
      message
    }
  }
`;
const SEND_PASSWORD = gql`
  mutation sendPassword($phoneNumber: String!, $password: String!) {
    changePassword(phoneNumber: $phoneNumber, password: $password) {
      code
      message
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
  SEND_PHONE,
  SEND_CODE,
  SEND_PASSWORD,
  USER_CHAT,
  BET_PLACE,
};
