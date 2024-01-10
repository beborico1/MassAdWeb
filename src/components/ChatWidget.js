import React, { useEffect, useState } from 'react';
import { FaRegComments, FaTimes } from 'react-icons/fa';
import { collection, addDoc, query, onSnapshot, orderBy, Timestamp, setDoc, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../helpers/firebase';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = React.useRef(null);

  const uid = auth.currentUser.uid;

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (message.trim() === '') return; // Asegúrate de que el mensaje no esté vacío

    const newMessage = {
      text: message,
      userId: uid,
      createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, `conversations/${uid}/messages`), newMessage);

    setMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `conversations/${uid}/messages`), orderBy('createdAt')),
      (snapshot) => {
        let newMessages = [];

        snapshot.forEach((doc) => {
          newMessages.push(doc.data());
        });

        setMessages(newMessages);
      }
    );

    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    const checkIfConversationExists = async () => {
      const docRef = doc(db, 'conversations', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          createdAt: Timestamp.now(),
        });
      }
    }

    checkIfConversationExists();
  }, [uid]);


  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      <button
        onClick={toggleChatWindow}
        className="rounded-full h-12 w-12 bg-massad-500 flex justify-center items-center shadow-sm mb-2"
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
                key={index}
                className={`${msg.userId === uid ? "self-end bg-massad-200" : "self-start bg-gray-200"} text-black text-sm rounded-lg px-3 py-2 mb-2`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef}></div> {/* Coloca la referencia aquí */}
          </div>
          <textarea
            className="w-full border p-2 rounded mb-2"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-massad-500 text-white p-2 rounded w-full"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
}
