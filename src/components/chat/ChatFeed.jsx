import React, { useState, useContext, useRef, useEffect } from "react";
import { Text, TextInput, ScrollArea } from "@mantine/core";
import "../styles/chat.css";
import ChatBubble from "./ChatBubble";
import { AppContext } from "../../App";
import { getTime } from "../../lib/ChatFeed/chatfeedlib.js";

const ChatFeed = () => {

  let {chatLog, setChatLog, profile, setProfile} = useContext(AppContext);
  const viewport = useRef(<ScrollArea></ScrollArea>);

  useEffect(() => {
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    let keyDownHandler = (event) => {
      // Enable below if you want to see keylog in console

      let messageText = document.getElementById('message').value;

      if (event.key === "Enter") {
        event.preventDefault();
        enterMessage(messageText);
        document.getElementById('message').value = "";
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  let enterMessage = (message) => {
    let time = getTime();

    setChatLog(chatLog = [...chatLog, {
      username: profile.username,
      message: message,
      timestamp: time
    }])
  }

  return (
    <div className="chat-window">
      <Text className="title">Chat Room Name Here</Text>
      <ScrollArea type="scroll" viewportRef={viewport} id="chat-box" className="chat-box" style={{ height: 250 }}>
        <ChatBubble />
    </ScrollArea>
    <TextInput
        id="message"
        className="newMessage"
        placeholder="Enter Message"
        radius="xl"
        withAsterisk
        />
    </div>
  )
}

export default ChatFeed;