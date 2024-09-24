import React, { useState, useRef } from 'react';
import { MdMic } from 'react-icons/md';

const ChatInput = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    setIsRecording(true);
    setShowPopup(true); // Show pop-up with Stop and Send button
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.start();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setShowPopup(false); // Hide the pop-up
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'file.wav', { type: 'audio/wav' });

        // Save the file to a directory (simulated here)
        console.log('Saving file:', audioFile);
        
        // Send a message to the chat UI that the file is being saved
        onSendMessage('Audio file is being saved as file.wav');
      };
    }
  };

  const handleSendClick = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="bg-[#2A2A2A] p-4 flex items-center gap-2 shadow-md">
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
      <button
        className={`bg-[${isRecording ? '#FF0000' : '#25D366'}] p-2 rounded-full text-white`}
        onClick={startRecording}  // Start recording on click
      >
        <MdMic size={20} />
      </button>

      {/* Pop-up for Stop and Send */}
      {showPopup && (
        <div className="popup bg-[#3A3A3A] p-4 rounded-lg shadow-md absolute bottom-20 right-10 text-white">
          <p>Recording... Press Stop to Save</p>
          <button
            className="bg-[#FF0000] p-2 rounded-full text-white mt-2"
            onClick={stopRecording}
          >
            Stop and Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;





// import React, { useState } from 'react';
// import { MdMic } from 'react-icons/md';

// const ChatInput = ({ onSendMessage }) => {
//   const [messageText, setMessageText] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState('English');

//   const handleSendClick = () => {
//     if (messageText.trim()) {
//       onSendMessage(messageText);
//       setMessageText('');
//     }
//   };

//   return (
//     <div className="bg-[#2A2A2A] p-4 flex items-center gap-2 shadow-md">
//       <select
//         className="border border-[#CFCFCF] rounded-full p-2 bg-[#3A3A3A] text-white"
//         value={selectedLanguage}
//         onChange={(e) => setSelectedLanguage(e.target.value)}
//       >
//         <option value="English">English</option>
//         <option value="Spanish">Spanish</option>
//         <option value="French">French</option>
//         <option value="German">German</option>
//         {/* Add more languages as needed */}
//       </select>
      
//       <input
//         className="flex-1 p-2 rounded-full border border-[#CFCFCF] bg-[#3A3A3A] text-white"
//         type="text"
//         placeholder="Type a message..."
//         value={messageText}
//         onChange={(e) => setMessageText(e.target.value)}
//         onKeyPress={(e) => {
//           if (e.key === 'Enter') handleSendClick();
//         }}
//         style={{ color: 'white' }}
//       />
//       <button className="bg-[#25D366] p-2 rounded-full text-white" onClick={handleSendClick}>
//         Send
//       </button>
//       <button className="bg-[#25D366] p-2 rounded-full text-white">
//         <MdMic size={20} />
//       </button>
//     </div>
//   );
// };

// export default ChatInput;
