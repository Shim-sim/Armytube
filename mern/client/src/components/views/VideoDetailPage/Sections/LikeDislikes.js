import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {
	
	
	
	const [Likes, setLikes] = useState(0)
	const [Dislikes, setDislikes] = useState(0)
	const [LikeAction, setLikeAction] = useState(null)
	const [DisLikeAction, setDisLikeAction] = useState(null)
	
	let variable = { }
	
	if (props.video) {
		variable = { videoId: props.videoId, userId: props.userId }
	} else {
		variable = { commentId: props.commentId , userId: props.userId }
	}
	
	useEffect(() => {
		axios.post('/api/like/getLikes', variable)
		.then(response => {
			if(response.data.success) {
				
				// 얼마나 많은 좋아요를 받았는지
				setLikes(response.data.likes.length)
				
				// 내가 이미 그 좋아요를 눌렀는지
				response.data.likes.map(like => {
					if(like.userId === props.usrId) {
						setLikeAction('liked')
					}
				})
			} else {
				alert('Likes 정보를 가져오지 못했습니다.')
			}
		})
		
		axios.post('/api/like/getDislikes', variable)
		.then(response => {
			if(response.data.success) {
				
				// 얼마나 많은 싫어요를 받았는지
				setDislikes(response.data.dislikes.length)
				
				// 내가 이미 그 싫어요를 눌렀는지
				response.data.dislikes.map(dislike => {
					if(dislike.userId === props.usrId) {
						setDisLikeAction('disliked')
					}
				})
			} else {
				alert('DisLikes 정보를 가져오지 못했습니다.')
			}
		})
		
	}, [])
	
	const onLike = () => {
		
		if(LikeAction === null) {
			axios.post('/api/like/uplike', variable)
			.then(response => {
				if(response.data.success) {
					setLikes(Likes + 1)
					setLikeAction('liked')
					
					if(DisLikeAction !== null) {
						setDisLikeAction(null)
						setDislikes(Dislikes - 1)
					}
				} else {
					alert('like를 실패했습니다.')
				}
			})
		} else {
			axios.post('/api/like/unlike', variable)
			.then(response => {
				if(response.data.success) {
					setLikes(Likes - 1)
					setLikeAction(null)
					} else {
					alert('like을 내리지 못했습니다.')
				}
			})
		}
	}
	
	 const onDislike = () => {

		if (DisLikeAction !== null) {
			axios.post('/api/like/unDislike', variable)
				.then(response => {
					if (response.data.success) {

						setDislikes(Dislikes - 1)
						setDisLikeAction(null)

					} else {
							alert('Failed to decrease dislike')
					}
			})

		} else {

		axios.post('/api/like/upDislike', variable)
		.then(response => {
				if (response.data.success) {

					setDislikes(Dislikes + 1)
					setDisLikeAction('disliked')

				//If dislike button is already clicked
				if(LikeAction !== null ) {
						setLikeAction(null)
						setLikes(Likes - 1)
				}

		} else {
				alert('Failed to increase dislike')
		}
		})
	}
}
	return (
		<div>
			<span key="comment-basic-like">
					<Tooltip title="Like">
							<Icon type="like"
									theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
									onClick={onLike} />
					</Tooltip>
					<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
			</span>&nbsp;&nbsp;
			<span key="comment-basic-dislike">
					<Tooltip title="Dislike">
							<Icon
									type="dislike"
									theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
									onClick={onDislike}
									 />
					</Tooltip>
					<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
			</span>
		</div>
	)
}

export default LikeDislikes