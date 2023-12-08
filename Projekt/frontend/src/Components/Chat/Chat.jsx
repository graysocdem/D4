import { React, useRef, useState, useEffect } from 'react'
import "./Chat.css"
import Navbar from "../Navigation/Navbar"
import { useParams, useNavigate } from "react-router-dom"
import { io } from 'socket.io-client'

const Chat = () => {

    const token = localStorage.getItem("token")
    const otherName = useParams().username
    const ourName = localStorage.getItem("user")
    const messageInputRef = useRef()

    let sampleConversation = [
            {User: ourName, Message: "hejsan"},
            {User: otherName, Message: "svejsan"},
            {User: ourName, Message: "hur mår du"},
            {User: otherName, Message: "bra"},
            {User: ourName, Message: "vad bra"},
            {User: ourName, Message: "hejdåååååååååååååååååååååååååååååååååååååå"},
            {User: otherName, Message: "hejdåååååååååååååååååååååååååååååååååååååå"},
        ]

    const [loading, setLoading] = useState(true)
    const [conversation, setConversation] = useState(null)
    const [globalSocket, setSocket] = useState(null)

    const sortedArray = [ourName, otherName].sort()
    const roomName = sortedArray[0] + "|" + sortedArray[1]

        useEffect(() => {

            
            const getConversation = async () => {
                const response = await fetch(`https://localhost:3443/getConversation/${roomName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    method: "GET"
                })
                const result = await response.json()
                if (Object.keys(result).length !== 0) {
                    console.log(result.response.messages)
                    setConversation(result.response.messages)
                }
                else {
                    console.log("result", result)
                    setConversation([])
                }
                //setConversation(sampleConversation)

            }
            
            getConversation();

            let socket = io('http://localhost:5500', 
            { 
                secure: true,
                query: {token}
            })

            socket.on('connect', () => {
                // socket
                // .on('authenticated', () => {
                    console.log("i have connected!")
                    setSocket(socket)
                    socket.emit('join-room', roomName)
                // })
                // .emit('authenticate', {token})

            })
        }, [])
    
        useEffect(() => {
            if (globalSocket) {
                globalSocket.on('message', (msg) => {
                    console.log("NU TOG JAG EMOT ETT MEDDELANDE")
                    console.log(conversation)
                    let conversationCopy = []
                    conversation.map((msg) => (conversationCopy.push(msg)))
                    conversationCopy.push({ user: otherName, message: msg })
                    setConversation(conversationCopy)             
                })
            
                globalSocket.on("connect_error", (err) => {
                    console.log(`connect_error due to ${err}`);
                })
            }
        }, [globalSocket, conversation])
        

        useEffect(() => {
            if (conversation !== null) {
                setLoading(false) 
            }
        }, [conversation])

        async function sendMessage() {
            const msg = messageInputRef.current.value
            messageInputRef.current.value = ""
            const msgCopy = msg
            if (msgCopy.trim(" ").length === 0) {
                return
              }
            if (globalSocket !== undefined && globalSocket !== null && conversation !== undefined) {
                    globalSocket.emit('message', roomName, ourName, msg)

                    //New object to trigger react rerender
                    let conversationCopy = []
                    conversation.map((msg) => (conversationCopy.push(msg)))
                    conversationCopy.push({ user: ourName, message: msg })
                    setConversation(conversationCopy)
            }
        }
    
    if (loading) {

    }
    else {
        return (
            <div className='container'>
                <Navbar />
                <div className='header'>
                        <div className='text'>Chatting with {otherName} </div>
                        <div className='underline'></div>
                    </div>
                <div className="chat-wrapper">
                    <div className="message-container">
                        {
                        conversation.map((messageObj) => (
                            //  console.log(messageObj.User, otherName)
                            <div className={`chat-message-box ${messageObj.user !== otherName ? 'box-me' : 'box-other'}` }>
                                <div className={`chat-message ${messageObj.user !== otherName ? 'me' : 'other'}`}>
                                    {messageObj.message + " "}
                                </div>
                            </div>
                            ))
                        }
                        </div>
                    <input type="text" ref={ messageInputRef }></input>
                    <input type="button" onClick={() => { sendMessage() }} value="Skicka meddelande"></input>
                </div>
    
            </div>
        )
    }


    
}

export default Chat





