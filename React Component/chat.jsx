import React, { useState,useEffect} from 'react';
import elfImage from '../assets/elf.png';
import cook from "universal-cookie"


export const Chat = ({skt}) => {

  const cookie=new cook()
  const sender=cookie.cookies.name
  console.log(cookie.cookies.name)

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  


  // useEffect(() => {
    
  //   skt.on("recieve-msg", (data) => {
  //     console.log("here ji")
  //     setMessages(prevMessages => [...prevMessages, data]);
      
  //   });
  // }, [skt]);


  useEffect(() => {
    const handleMessage = (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    };
  
    skt.on("recieve-msg", handleMessage);
  
    return () => {
      skt.off("recieve-msg", handleMessage); // Unsubscribe when component unmounts
    };
  }, [skt]);


  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      const data={
        text:message,
        sender:sender
      }
      skt.emit("message", data);
      setMessage('');
      
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-white p-4 rounded-lg shadow-md">
      <div className="mb-2">
        {messages.map((msg,index) => (
          <div key={index} className="flex items-center mb-2">
            <img 
              className="w-8 h-8 rounded-full mr-2"
              src={elfImage}
              alt="User Avatar"
            />
            <div className="font-semibold">{msg.sender}</div>
            <div className="bg-gray-100 p-2 rounded-md ml-2">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};


