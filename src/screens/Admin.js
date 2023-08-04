import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../helpers/firebase';
import { FaChevronLeft, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchConversations = async () => {
            const conversationsCollection = collection(db, 'conversations');
            const conversationsSnapshot = await getDocs(conversationsCollection);
            let conversations = [];
            for (const conversation of conversationsSnapshot.docs) {
                const userDoc = await getDoc(doc(db, 'users', conversation.id));
                const newConversation = {
                    id: conversation.id,
                    ...conversation.data(),
                    user: userDoc.data()
                };
                conversations.push(newConversation);
            }
            setConversations(conversations);
        };


        fetchConversations();
    }, []);

    useEffect(() => {
        if (currentConversation) {
            const unsubscribe = onSnapshot(
                query(collection(db, `conversations/${currentConversation.id}/messages`), orderBy('createdAt')),
                (snapshot) => {
                    let newMessages = [];

                    snapshot.forEach((doc) => {
                        newMessages.push(doc.data());
                    });

                    setMessages(newMessages);
                }
            );

            return unsubscribe;
        }
    }, [currentConversation]);

    const sendMessage = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, `conversations/${currentConversation.id}/messages`), {
            text: newMessage,
            createdAt: serverTimestamp(),
            userId: "admin",
        });

        setNewMessage("");
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            if (!auth.currentUser) {
                return;
            }
            setIsLoading(true);
            const docRef = doc(db, 'users', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            // checamos si su campo admin es true
            if (docSnap.exists() && docSnap.data().admin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setIsLoading(false);
        }

        getCurrentUser();
    }, [auth.currentUser]);

    return (
        isAdmin ?
            <div className="flex h-screen bg-gray-200 p-4 pt-20">
                <button className="cursor-pointer bg-massad-500 hover:bg-massad-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 flex justify-center items-center" onClick={() => navigate('/perfil-usuario')}>
                    <FaChevronLeft size={20} style={{ marginRight: '10px' }} />
                    Regresar
                </button>

                <div className="w-1/3 bg-white rounded p-4 shadow-lg overflow-y-scroll">
                    <h1 className="text-gray-700 text-lg mb-4">
                        Conversaciones
                    </h1>
                    {conversations.map((conversation, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentConversation(conversation)}
                            className="w-full text-left py-2 px-4 hover:bg-gray-200 focus:outline-none"
                        >
                            Conversación con: {conversation.user.email}
                        </button>
                    ))}
                </div>
                {currentConversation && (
                    <div className="w-2/3 bg-white rounded p-4 shadow-lg ml-4 flex flex-col overflow-y-scroll">

                        <div className="flex-grow overflow-y-scroll flex flex-col">
                            <h2 className="text-gray-700 text-lg mb-4">
                                Mensajes de la conversación con {currentConversation.user.email}
                            </h2>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`border rounded p-2 mb-2 ${message.userId === "admin" ? 'bg-massad-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={sendMessage} className="flex">
                            <input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="border rounded p-2 flex-grow mr-2"
                                placeholder="Escribe tu mensaje aquí"
                            />
                            <button type="submit" className="px-4 py-2 bg-massad-600 text-white rounded flex items-center">
                                <FaPaperPlane className="mr-2" />
                                Enviar
                            </button>
                        </form>
                    </div>
                )}
            </div>
            :
            <div className="flex h-screen w-full items-center justify-center">
                <h1 className="text-gray-700 text-lg mb-4">
                    {isLoading ? "Cargando..." : "No tienes permisos de administrador"}
                </h1>
            </div>
    )
}
