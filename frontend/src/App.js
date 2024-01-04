import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import React from 'react';
import Home from './containers/Home';
import NoPage from './components/NoPage';
import ChatPage from './containers/chat/ChatPage';
import ChatHistoryContainer from './containers/chat/ChatHistoryContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/*" element={<NoPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/test" element={<ChatHistoryContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
