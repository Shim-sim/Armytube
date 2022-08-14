import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment'

function Comment(props) {
	
	const videoId = props.postId
	  
	const user = useSelector(state => state.user)
	const [Comment, setComment] = useState("")
	
	const handleChange = (e) => {
		setComment(e.target.value)
	}
	
	const onSubmit = (e) => {
		e.preventDefault()
		
		const vairables = {
			content: Comment,
			writer: user.userData._id,
			postId: videoId
		}
		
		axios.post('/api/comment/saveComment', vairables)
		.then(response => {
			if(response.data.success) {
				setComment('')
				props.refreshFunction(response.data.result)
			} else {
				alert('코멘트를 저장하는데 실패했습니다.')
			}
		})
	}
	
	return (
		<div>
			<br />
			<p>Replies</p>
			<br />
			
			{/* Coment Lists */}			
			{props.commentLists && props.commentLists.map((comment, index)=>(
				(!comment.responseTo &&
				 <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} key={index}/>
				)
				
			))}
			
			
			{/* Root Comment Form  */}
			
			<form style={{ display: 'flex'}} onSubmit={onSubmit}>
				<textarea
					style={{ width: '100%', borderRadius: '5px' }}
					onChange={handleChange}
					value={Comment}
					placeholder="코멘트를 작성해주세요"
				/>
				<br />
				<button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
		</form>
		</div>
	)
}

export default Comment