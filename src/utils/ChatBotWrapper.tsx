'use client';  

import React from 'react';
import { Chatbot } from 'panoschnar-chatbot-react';  
import { ChatbotIcon } from '../../public/icons';  

export const ChatbotWrapper: React.FC = () => {
  return (
    <div>
      <Chatbot
        title="My Health Assistant"
        primaryColor="#07c7b1"
        icon={ChatbotIcon}
        apiEndpoint="/api/chatbot"  
      />
    </div>
  );
};
