import { React, useRef, useState, useEffect } from 'react'
import "./Homepage.css"
import Navbar from "../Navigation/Navbar"
import Post from "../Post/Post"
import { useNavigate, useLocation} from 'react-router-dom'

import fetchPosts from "../../Scripts/fetchPosts.js"
import publishPost from "../../Scripts/publishPost.js"


const Homepage = () => {
    
    const navigate = useNavigate();

    const location = useLocation().pathname
    const [posts, setPosts] = useState(null)
    const [tokenExpired, setTokenExpired] = useState(false)
    const [loading, setLoading] = useState(true)
    const ownerName = localStorage.getItem("user")

    //Skickar till login när token har gått ut
    useEffect(() => {
        if(tokenExpired) {
            localStorage.clear()
            navigate("/")
        }
    }, [tokenExpired])

    useEffect(() => {
        if (location !== "/homepage")  {
            navigate("/homepage")
        }

        //Måste vara i funktion pga await kan ej köras i useEffect annars
        const fetchInitialPosts = async () => {
            let posts = await fetchPosts(ownerName, localStorage.getItem("token"), navigate)
            if (posts === null) {
                setTokenExpired(true)
            }
            if (posts) {setPosts(posts.reverse())}
        }
        fetchInitialPosts()

        //AJAX - fetchar posts var femte sekund.
        const interval = setInterval(async () => { const results = await fetchPosts(ownerName, localStorage.getItem("token"));  results ? setPosts(results.reverse()) : setTokenExpired(true) }, 3000);
        return () => {clearInterval(interval)} 

    }, [])
    
    const messageInputRef = useRef()

    //Publicerar meddelande
    const handlePublish = async (e) => {
        e.preventDefault()
        
        const post = {
            owner: ownerName,
            user: ownerName,
            message: messageInputRef.current.value
        }

        messageInputRef.current.value = ""

        if (post.message.length === 0 || post.message.length > 140) {
            alert("Invalid message length")
        }
        else { 
            const result = publishPost(post, localStorage.getItem("token"))
            if (!result) {setTokenExpired(true)}
        }
    }

    //Stänger av loading när posts har laddat
    useEffect(() => {
        if (posts != null) {setLoading(false); return}
    }, [posts])

    
    if (loading) {
        return (
            <div className='container'>
            <Navbar />
            <div className='header'>
                <div className='text'>{ownerName}'s Homepage</div>
                <div className='underline'></div>
            </div>

            <div className='wrapper'>
                <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef}/>
                <input className="button" type="button" onClick={(e) => {handlePublish(e)}} value="Post" />

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
                    <div className='text'>{ownerName}'s Homepage</div>
                    <div className='underline'></div>
                </div>
    
                <div className='wrapper'>
                    <textarea placeholder="här skriver du ditt meddelande. om du vill asså. jag tänker inte tvinga dig till nåt. faktum är, hela den här appen är frivillig att använda." ref={messageInputRef}/>
                    <input className="button" type="button" onClick={(e) => {handlePublish(e)}} value="Post" />
    
                    <hr />
    
                    { posts.map( (post) => (
                     <Post name={post.user} message={post.message} timestamp={post.timestamp} />
                    ))}
                    
                </div>
            </div>
        )
    }
}

export default Homepage