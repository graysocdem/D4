import { useEffect } from 'react'
import Homepage from '../Homepage/Homepage'
import Userpage from '../Userpage/Userpage'
import Login from '../Login/Login'
import Friendlist from '../Friendlist/Friendlist'
import Search from '../Search/Search'
import Error from '../Error/Error'
import Chat from '../Chat/Chat'
import { Route, Routes, useNavigate } from "react-router-dom"

const MyRoutes = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("user") === null) {
            navigate("/")
        }
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/friends" element={<Friendlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/chat/:username" element={<Chat />} />
            <Route path="/user/:username" element={<Userpage />} />
            <Route path='*' element={<Error />} />
        </Routes>
        )
}

export default MyRoutes