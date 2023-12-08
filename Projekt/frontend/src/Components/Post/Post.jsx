import "./Post.css"

const Post = (props) => {

    return (
        <div className="post-container">
            <div className="name">
                { props.name }
            </div>
            <div className="message">
                { props.message }
            </div>
            <div className="time">
                { props.timestamp }
            </div>
        </div>
    )
}

export default Post