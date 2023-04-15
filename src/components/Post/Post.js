import {Avatar} from "@mui/material"
import "./Post.css"

export const Post = (props) => {
    const g = require(`C:/Users/Shree/ReactNative/dappazon-master/src/assets/items/${props.imageUrl}`);
    return (
    <div className='post'>
        <div className='post__header'>
        <Avatar
        className="post__avatar"
        alt = {props.username}
        src = {props.imageUrl}
        />
        <h3>{props.username}</h3>
        </div>

        {/* header =>avatar+username */}
        <img 
        src={g}        
        className="post__image"
        ></img>
        {/* image */}
        <h4 className='post__text'><strong>chetan</strong> You are Great</h4>
        {/* username caption */}
    </div>
  )
}
