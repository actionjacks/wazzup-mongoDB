import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
//axios altternatywa do fecza
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //to odnosi sie do backendowego routa GET
    axios.get("/messages/sync").then((respons) => {
      console.log(respons.data);
      setMessages(respons.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("329b02fb812b5a1068a8", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      //alert pokaze sie na stronie reactowej
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      //czysci pamiec
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
