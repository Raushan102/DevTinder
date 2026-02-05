import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "./socketConfig";
import { useSelector } from "react-redux";
import axios from 'axios'
import { BASE_URL } from "../util/constent";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Phone, MoreVertical, Smile, ShieldCheck } from "lucide-react";

function ChatWindow({ currentChatProfile, onBack, loading: parentLoading }) {
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [isSwitching, setIsSwitching] = useState(false); // NEW: Local loader state
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [offsetTop, setOffsetTop] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const socketRef = useRef(null);

  const userId = user?._id;
  const targetUserId = currentChatProfile?._id;

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.visualViewport) {
        setViewportHeight(window.visualViewport.height);
        setOffsetTop(window.visualViewport.offsetTop);
      }
      setIsMobile(window.innerWidth < 768);
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
      window.visualViewport.addEventListener("scroll", handleViewportChange);
    }
    window.addEventListener("resize", handleViewportChange);
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleViewportChange);
        window.visualViewport.removeEventListener("scroll", handleViewportChange);
      }
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  const fetchChat = async (tId) => {
    setIsSwitching(true); // Start loading immediately
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${tId}`, { withCredentials: true });
      if (chat?.data?.data?.messages?.length > 0) {
        const formattedChat = chat.data.data.messages.map(ele => ({
          firstName: ele.senderId.firstName,
          photoUrl: ele.senderId.photoUrl,
          text: ele.text,
          senderId: ele.senderId._id,
          timestamp: ele.createdAt,
          _id: ele._id
        }));
        setMessages(formattedChat);
      } else {
        setMessages([]);
      }
    } catch (error) {
      setMessages([]);
    } finally {
      setIsSwitching(false); // Stop loading
    }
  };

  const sendMessage = () => {
    const text = inputRef.current?.value?.trim();
    if (!text || !socketRef.current) return;
    const localMsg = { firstName: user.firstName, photoUrl: user.photoUrl, text, senderId: userId, timestamp: new Date().toISOString(), _id: `temp-${Date.now()}` };
    setMessages(prev => [...prev, localMsg]);
    socketRef.current.emit("sendMessage", { firstName: user.firstName, photoUrl: user.photoUrl, userId, targetUserId, text });
    if (inputRef.current) { inputRef.current.value = ""; inputRef.current.focus(); }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, viewportHeight, isSwitching]);

  useEffect(() => {
    if (!targetUserId) return;
    fetchChat(targetUserId);
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinChat", { userId, targetUserId });
    socket.on("messageReceived", (data) => {
      if (data.senderId !== userId) {
        setMessages(prev => [...prev, { ...data, _id: `socket-${Date.now()}` }]);
      }
    });
    return () => { socket.disconnect(); socketRef.current = null; };
  }, [userId, targetUserId]);

  if (!user || !currentChatProfile) return null;

  // Combine parent loading (if any) and local switching state
  const isLoading = parentLoading || isSwitching;

  return (
    <div
      style={isMobile ? {
        height: `${viewportHeight}px`,
        top: `${offsetTop}px`,
        position: 'fixed',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.08))'
      } : {
        height: '100%',
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.08))'
      }}
      className="left-0 right-0 flex flex-col backdrop-blur-md border-l border-white/20 rounded-none z-[999] md:flex-1 overflow-hidden"
    >

      {/* 1. HEADER */}
      <div className="flex-none h-20 backdrop-blur-xl border-b border-white/20 px-6 flex items-center justify-between z-10"
           style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))' }}>
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="md:hidden w-10 h-10 border border-black rounded-none flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="w-12 h-12 border-2 border-black overflow-hidden bg-white shadow-lg">
            <img src={currentChatProfile.photoUrl} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-sm uppercase tracking-widest text-black leading-none">
              {currentChatProfile.firstName}
            </h2>
            <div className="flex items-center gap-1 mt-1.5">
              <ShieldCheck size={10} className="text-black/60" />
              <p className="text-[9px] font-bold text-black/60 uppercase tracking-tighter">
                {isLoading ? "SYNCING..." : currentChatProfile.profession}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 border border-black flex items-center justify-center bg-white/20 text-black hover:bg-black hover:text-white transition-all"><Phone size={16}/></button>
          <button className="w-10 h-10 border border-black flex items-center justify-center bg-white/20 text-black hover:bg-black hover:text-white transition-all"><MoreVertical size={16}/></button>
        </div>
      </div>

      {/* 2. MESSAGES AREA - With Loader */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 bg-transparent relative"
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-dots loading-lg text-black"></span>
              <p className="text-xs font-black uppercase tracking-widest text-black/60">Loading messages...</p>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => {
              const isOwn = msg.senderId === userId;
              return (
                <motion.div
                  key={msg._id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {!isOwn && (
                    <div className="w-9 h-9 border border-black overflow-hidden bg-white self-end mb-1 flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <img src={msg.photoUrl} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <div className={`px-5 py-3 border-2 border-black ${
                      isOwn
                        ? 'bg-black text-white'
                        : 'backdrop-blur-lg bg-white/80 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}>
                      <p className="text-sm font-bold leading-relaxed tracking-tight uppercase">
                        {msg.text}
                      </p>
                    </div>
                    <span className="text-[8px] mt-2 font-black uppercase text-black/60 tracking-widest">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* 3. INPUT AREA */}
      <div className="flex-none p-6 backdrop-blur-2xl border-t border-white/20 flex gap-4 items-center"
           style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0.2), rgba(255,255,255,0.1))' }}>
        <button className="w-12 h-12 border border-black flex items-center justify-center bg-white/40 text-black hover:bg-black hover:text-white transition-all">
          <Smile size={20} />
        </button>
        <div className="flex-1">
          <input
            ref={inputRef}
            placeholder={isLoading ? "SYNCING..." : "TYPE MESSAGE..."}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
            className="w-full h-12 px-6 border-2 border-black bg-white/90 text-black font-black uppercase text-xs tracking-widest placeholder-black/30 focus:outline-none focus:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="w-16 h-12 bg-black text-white flex items-center justify-center border-2 border-black hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send size={18} />
        </button>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 0px; }
        input::placeholder { color: rgba(0,0,0,0.4); }
      `}</style>
    </div>
  );
}

export default ChatWindow;
