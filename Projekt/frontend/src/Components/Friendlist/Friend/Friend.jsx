import { React } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './Friend.css'

const Friend = (props) => {

    const navigate = useNavigate()

    return (
        <div className="request-container">
            <div className='name'>{props.name}</div>
            <div className='accept-button' type="button" value="knapp">
                <input type="button" value="Chat" onClick={() => {navigate(`/chat/${props.name}`)}}></input>
                <input type="button" value="Visit page" onClick={() => {navigate(`/user/${props.name}`)}}></input>
            </div>
        </div>
    )
}
export default Friend