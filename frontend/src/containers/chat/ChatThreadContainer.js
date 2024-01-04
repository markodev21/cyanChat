import React, { useEffect } from 'react';
import axios from 'axios';
import { subscribe, unsubscribe } from '../../event/event';
import {UserChat, SysMessage, ChatAnswer, ChatItem} from "../../components/chat/ChatContent"

const ChatThreadContainer = () => {
  const [threadId, setThreadId] = React.useState(0);
  const [messageList, setMessageList] = React.useState([]);

  useEffect(() => {
    const postData = { threadId: threadId };
    // getMessageListFromSever(postData);
    subscribe("addmessage", onAddMessage);

    return() =>{
      unsubscribe("addmessage", onAddMessage);
    }
  }, []);

  const onAddMessage = (event) => {
    console.log(event.detail);
    setMessageList(prevComponents => [
      ...prevComponents,
      event.detail,
    ])
  }

  const getMessageListFromSever = (postData) => {
    axios.post('http://localhost:5000/api/get-chat-list', postData)
      .then(response => {
        let messageString = response.data.message;

        setMessageList(messageString)
      });
  }

  const conditional = (msg, index) => {
    switch(msg.chatType) {
      case 'answer':
        return <ChatAnswer chatMsg={msg.chatMsg} key={index}/>;
      case 'system':
        return <SysMessage chatMsg={msg.chatMsg} key={index}/>;
      default:
        return <UserChat chatMsg={msg.chatMsg} key={index}/>;
    }
  }

  return (
    <div className='chat-content'>
      {messageList.map((msg, index) => [
          conditional(msg, index)
        ])
      }
    </div>
  );
};

export default ChatThreadContainer;