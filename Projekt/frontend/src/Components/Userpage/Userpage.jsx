import { React, useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./Userpage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"

import fetchUser from "../../Scripts/fetchUser.js"
import fetchPosts from "../../Scripts/fetchPosts.js"


const Userpage = () => {

    const navigate = useNavigate()

    const ownerName = useParams().username
    const visitorName = localStorage.getItem("user")

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ownerObject, setOwner] = useState(null)
    const [friendStatus, setFriendStatus] = useState(null)
    const [tokenExpired, setTokenExpired] = useState(false)

    useEffect(() => {
        if (tokenExpired) {
            localStorage.clear()
            navigate("/")
        }
    }, [tokenExpired])

    if (ownerName === visitorName) {
        console.log("equal:", ownerName, visitorName)
        navigate("/homepage")
    }

    const messageInputRef = useRef()
    const friendButtonRef = useRef()

    const publishPost = async (e) => {
        e.preventDefault()

        if (!ownerObject.friends.includes(visitorName)) {
            alert("Only friends of this user can post on their page!")
            return
        }

        const message = messageInputRef.current.value

        messageInputRef.current.value = ""

        if (message.length === 0 || message.length > 140) {
            alert("Invalid message length. Your message must be between 0 and 140 characters.")
            return
        }

        const result = await fetch(`http://localhost:3000/post`, {
            headers: {
                "content-type": "application/json",
                'x-access-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ owner: ownerName, user: visitorName, message: message }),
            method: "POST"
        })
        if (!result) {
            setTokenExpired(true)
        }
    }

    const fetchFriendStatus = () => {
        
        if (ownerObject.requests.includes(visitorName)) {
            return "pending"
        }
        else if (ownerObject.friends.includes(visitorName)) {
            {
                return "accepted"
            }
        }
        else {
            return "unsent"
        }
    }

    const handleRequest = () => {

        if (friendStatus === "unsent") {
            const result = fetch(`http://localhost:3000/${ownerName}/request`, {
                headers: {
                    "content-type": "application/json",
                    'x-access-token': localStorage.getItem("token")
                },
                body: JSON.stringify({owner: ownerName, suitor: visitorName}),
                method: "POST"
            })
            if (!result) {setTokenExpired(true)}
            setFriendStatus("pending")
            setFriendButtonColor("pending")
        }

    }

    const setFriendButtonColor = (status) => {
        if (status === "pending") {
            friendButtonRef.current.style.backgroundColor = "yellow"
            friendButtonRef.current.value = "Request pending"
        }
        else if (status === "accepted") {
            friendButtonRef.current.style.backgroundColor = "green"
            friendButtonRef.current.value = "Friend"
        }
        else {
            friendButtonRef.current.value = "Send friend request"
        }
    }

    useEffect(() => {
        const middle = async () => {

            const userResult = await fetchUser(ownerName, localStorage.getItem("token"))
            const postsResult = await fetchPosts(ownerName, localStorage.getItem("token"))

            if (userResult && postsResult) {
                setOwner(userResult)
                setPosts(postsResult)
            }
            else {
                setTokenExpired(true)
            }
        }
        middle()
    }, []);

    useEffect(() => {
        const interval = setInterval( async () => 
            {
                const result = await fetchPosts(ownerName, localStorage.getItem("token"))
                if (!result) {setTokenExpired(true)}
                else {setPosts(result)}
            }, 3000);

        return () => { clearInterval(interval) }
    }, []);

    useEffect(() => {
        if (ownerObject !== null) {setFriendStatus(fetchFriendStatus())}
    }, [ownerObject])

    useEffect(() => {
        if (posts != null && ownerObject != null) { setLoading(false) }
        if (!loading) {
            setFriendButtonColor(friendStatus)
        }
    }, [posts, ownerObject])

    if (loading) {
        return (
            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>{ownerName}'s Page</div>
                    <div className='underline'></div>
                </div>

                <div className='wrapper'>
                    <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef} />
                    <input className="button" type="button" onClick={(e) => { publishPost(e) }} value="Post" />

                    <hr />

                    <h1>Loading...</h1>

                </div>
            </div>
        )
    }
    else {
        return (
            <div className='container'>
                <Navbar />
                <div className='header'>
                    <div className='text'>{ownerName}'s Page</div>
                    <div className='underline'></div>

                            <input className="friend-button" type="button" onClick={ () => handleRequest() } ref={ friendButtonRef }></input>                    
                </div>

                <div className='wrapper'>
                    <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef} />
                    <input className="button" type="button" onClick={(e) => { publishPost(e) }} value="Post" />

                    <hr />

                    {posts.map((post) => (
                        <Post name={post.user} message={post.message} timestamp={post.timestamp} />
                    ))}

                </div>

            </div>
        )
    }

}

export default Userpage