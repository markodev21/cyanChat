import React, { useEffect } from 'react';
import axios from 'axios';
import ChatInput from '../../components/chat/ChatInput';
import { publish } from '../../event/event';

const ChatInputContainer = () => {
  const [chatText, setChatText] = React.useState("");

  const handleChatInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendClicked();
    }
  }

  const handleChatTextChange = (event) => {
    setChatText(event.target.value);
  }

  const sendClicked = () => {
    if (chatText === "") {
      console.log("Type your message.");
      return;
    }
    addChat('question', chatText);
    addChat('system', chatText);
    addChat('answer', chatText);
    setChatText("");
    // sendQuestion();
  };

  function addChat(chatType, chatMsg) {
    publish('addmessage', {chatType, chatMsg});
  }

  const sendQuestion = () => {
    const postData = { username: "user", prompt: chatText };
    publish('startLoading');
    axios.post('http://localhost:5000/api/ask-a-question', postData)
      .then(response => {
        setTimeout(() => {
        }, 1000); // 1 second delay (adjust as needed)
        
        addChat('answer', response.data.message.split('\n'));
        publish('endLoading');
      })
      .catch(error => console.log('Error fetching data:' + error))
      .finally(() => {
      });      
  }

  const learnClicked = () => {
    console.log('Learn button clicked.');
    publish('endLoading');
  };

  const newChatClicked = () => {
    publish('startLoading');
    // const postData = { username: "user" };
    // axios.post('http://localhost:5000/api/create-new-chat', postData)
    //   .then(response => {
    //     console.log("New chat created.");
    //   })
    //   .catch(error => console.error('Error fetching data:' + error));
  };

  return (
    <ChatInput 
    chatText={chatText} 
    handleChatInputKeyDown={handleChatInputKeyDown} 
    handleChatTextChange={handleChatTextChange} 
    sendClicked={sendClicked} 
    learnClicked={learnClicked} 
    newChatClicked={newChatClicked} 
    />
  );
};

export default ChatInputContainer;