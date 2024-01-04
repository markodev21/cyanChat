import React from 'react';

import '../../styles/components/chat/ChatContent.css';
import CircularIntegration from './CircularIntegration';

export const UserChat = ({chatMsg}) => {
  return (
    <div className='chat-content-user'>
    {
      <React.Fragment>
        {chatMsg}
        <br />
      </React.Fragment>
    }
    </div>
  );
}

export const SysMessage = ({chatMsg}) => {
  return (
    <div className='chat-content-server-status'>
      <CircularIntegration/>
      <div className='loading-text'>{chatMsg}</div>
    </div>
  );
}

export const ChatAnswer = ({chatMsg}) => {
  return (
    <div className='chat-content-ai'>
    {
      <React.Fragment>
        {chatMsg}
        <br />
      </React.Fragment>
    }
    </div>
  );
}

export default UserChat;
