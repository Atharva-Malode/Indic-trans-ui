import React, { useState } from 'react';
import { MdMic } from 'react-icons/md';

const ChatInput = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleSendClick = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="bg-[#2A2A2A] p-4 flex items-center gap-2 shadow-md">
      <select
        className="border border-[#CFCFCF] rounded-full p-2 bg-[#3A3A3A] text-white"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        {/* Add more languages as needed */}
      </select>
      
      <input
        className="flex-1 p-2 rounded-full border border-[#CFCFCF] bg-[#3A3A3A] text-white"
        type="text"
        placeholder="Type a message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSendClick();
        }}
        style={{ color: 'white' }}
      />
      <button className="bg-[#25D366] p-2 rounded-full text-white" onClick={handleSendClick}>
        Send
      </button>
      <button className="bg-[#25D366] p-2 rounded-full text-white">
        <MdMic size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
