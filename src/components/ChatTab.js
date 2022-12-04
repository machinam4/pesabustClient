import { GET_CHATS, USER_CHAT } from "../queries.js/gqlQueries";
import { useQuery, useMutation } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";
import Moment from "moment";
import { useState, useEffect } from "react";
import { socket } from "../context/socket";
import { useSelector } from "react-redux";

const ChatTab = () => {
  const [Message, setMessage] = useState("");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [sendMessage] = useMutation(USER_CHAT);
  useEffect(() => {
    socket.on("chat_send", (data) => {
      refetch();
    });
  });
  const { loading, error, data, refetch } = useQuery(GET_CHATS);
  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-center text-red-200">Error : {error.message}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({
      variables: {
        message: Message,
      },
    });
    await socket.emit("chat_send");
    refetch();
  };
  // setMessages(data.chats);

  return (
    <div>
      <div className="w-full flex flex-col h-64 overflow-hidden" id="chat">
        <div className="messages flex-1 overflow-y-scroll border-box px-4 scroll-auto">
          {data.chats
            .slice(0)
            .reverse()
            .map(({ _id, message, createdAt, user }) => (
              <p key={_id} className="message-content text-yellow text-sm">
                {Moment(createdAt).format("LT")}{" "}
                <span className="text-orange"> {user.username} : </span>
                <span className="text-white">{message}</span>
              </p>
            ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row rounded">
            <input
              disabled={!isAuth}
              className="flex-1 rounded"
              value={Message}
              placeholder={isAuth ? "Message or /Help..." : "Login to chat"}
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              required
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <button
              className="w-16 hover:bg-orange focus:bg-yellow"
              disabled={!isAuth}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatTab;
