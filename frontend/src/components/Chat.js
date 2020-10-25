import React, { useState } from "react";
import "../style/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import CallMissedIcon from "@material-ui/icons/CallMissed";
import CallMissedOutgoingIcon from "@material-ui/icons/CallMissedOutgoing";
import AirlineSeatLegroomReducedIcon from "@material-ui/icons/AirlineSeatLegroomReduced";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import axios from "../axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "DEMO",
      timestamp: "now!",
      received: false,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>rooom name</h3>
          <p>last seen at</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <CallMergeIcon />
          </IconButton>
          <IconButton>
            <CallMissedIcon />
          </IconButton>
          <IconButton>
            <CallMissedOutgoingIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <AirlineSeatLegroomReducedIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <DirectionsRunIcon />
      </div>
    </div>
  );
}

export default Chat;
