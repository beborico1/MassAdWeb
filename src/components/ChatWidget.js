import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaRegComments, FaTimes } from 'react-icons/fa';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = React.useRef(null);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '+526622271342',
          body: message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.messageSid);
        setMessages((messages) => [...messages, message]);
        setMessage('');
      } else {
        console.log('Error sending message');
      }
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('newMessage', (message) => {
      setMessages((messages) => [...messages, message.body]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      <button
        onClick={toggleChatWindow}
        className="rounded-full h-12 w-12 bg-adstream-500 flex justify-center items-center shadow-sm mb-2"
      >
        {isOpen ? (
          <FaTimes size={20} className="text-white transform" />
        ) : (
          <FaRegComments size={20} className="text-white" />
        )}
      </button>
      {isOpen && (
        <div className="bg-white p-4 rounded shadow-lg w-64 transition-all duration-300 ease-in-out flex flex-col">
          <div className="flex flex-col overflow-y-scroll h-64">
            {messages.map((msg, index) => (
              <div
                ref={messagesEndRef}
                key={index}
                className="self-end bg-adstream-200 text-black text-sm rounded-lg px-3 py-2 mb-2"
              >
                {msg}
              </div>
            ))}
          </div>
          <textarea
            className="w-full border p-2 rounded mb-2"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-adstream-500 text-white p-2 rounded w-full"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
}
