import { GET_CHATS, USER_CHAT } from "../queries.js/gqlQueries";
import { useQuery, useMutation } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";
import Moment from "moment";
import { useState, useEffect } from "react";
import { socket } from "../context/socket";
import { useSelector } from "react-redux";
import { useRef } from "react";

const ChatTab = () => {
  const [Message, setMessage] = useState("");
  const bottomRef = useRef(null);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [sendMessage] = useMutation(USER_CHAT);
  const { loading, error, data, refetch } = useQuery(GET_CHATS);
  useEffect(() => {
    socket.on("chat_send", (data) => {
      refetch();
    });
    console.log("wqiwoq");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [refetch, data]);

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
    setMessage("");
    refetch();
  };
  // setMessages(data.chats);

  return (
    <div>
      <div className="w-full flex flex-col h-64 overflow-hidden" id="chat">
        <div className="messages flex-1 overflow-y-scroll border-box px-1 md:px-4">
          {data.chats
            .slice(0)
            .reverse()
            .map(({ _id, message, createdAt, user }) => (
              <p
                key={_id}
                className="message-content text-yellow text-xs md:text-sm"
              >
                {Moment(createdAt).format("HH:mm")}{" "}
                <span className="text-orange"> {user.username} : </span>
                <span className="text-white">{message}</span>
              </p>
            ))}
          <div ref={bottomRef} />
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
              className="w-16 bg-orange hover:bg-yellow focus:bg-yellow"
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
