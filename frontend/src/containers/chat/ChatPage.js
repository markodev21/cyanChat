import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';

import '../../styles/global.css';
import '../../styles/layout/chat/ChatPage.css';
import '../../styles/components/chat/ChatContent.css';

import ChatHistoryContainer from "./ChatHistoryContainer";
import ChatInputContainer from './ChatInputContainer';
import ChatThreadContainer from './ChatThreadContainer';
import {Content, Container, Stack} from '@mui/material';


const ChatPage = () => {
  return (
    <div>
      <div className='chat-container'>
        <div className='chat-header'>
          <p className='header-title'>Tax Genii</p>
        </div>

        <ChatHistoryContainer />

        <ChatThreadContainer/>

        <ChatInputContainer/>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
      </div>
    </div>

  );
};

export default ChatPage;