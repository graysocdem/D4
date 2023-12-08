import { React } from 'react'
import { useNavigate } from 'react-router-dom'

import "./User.css"

const User = (props) => {
    const navigate = useNavigate()

    const localUser = localStorage.getItem("user")

    return (
        <div className="user-container" onClick={() => {localUser === props.name ? navigate("/homepage") : navigate(`/user/${props.name}`)}} >
            <div className="name">
                Name: {props.name}
            </div>
            <div className='friend-amount'>
                Friends: {props.friendAmount}
            </div>
        </div>
    )
}

export default User