const publishPost = async (post, token) => {

    fetch(`http://localhost:3000/post`, {
        headers: {
             'Content-Type': 'application/json',
             'x-access-token': token
         },
        method: "POST",
        body: JSON.stringify({owner: post.owner, user: post.user, message: post.message}),
    })
}
 
export default publishPost
