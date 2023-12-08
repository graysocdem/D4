const fetchUser = async (user, token) => {

    const response = await fetch(`http://localhost:3000/user/${user}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        method: "GET"
    })
    if (response.status === 401) {
        return null
    }
    const result = await response.json()
    return result
}

export default fetchUser