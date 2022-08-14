import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'
import Comment from './Sections/Comment'

function VideoDetailPage(props) {
	
	const videoId = props.match.params.videoId
	const variable = { videoId: videoId }
	
	const [VideoDetail, setVideoDetail] = useState([])
	const [Comments, setComments] = useState([])
	
	const updateComment = (newComment) => {
		setComments(Comments.concat(newComment))
	}
	
	useEffect(()=> {
		
		axios.post('/api/video/getVideoDetail', variable)
		.then(response => {
			if(response.data.success) {
				setVideoDetail(response.data.videoDetail)
			} else {
				alert('비디오 정보를 가져오길 실패했습니다.')
			}
		})
		
		axios.post('/api/comment/getComments', variable)
		.then(response => {
			if(response.data.success) {
				console.log(response.data.comments)
				setComments(response.data.comments)
			} else {
				alert('코멘트 정보를 가져오는데 실패했습니다.')
			}
		})
		
	}, [])
	
	

	if(VideoDetail.writer) {
	const subcribeButton = 	VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
		
			return (
			<Row gutter={[16, 16]}>
				<Col lg={18} xs={24}>
					
				<div style={{ width: '100%', padding:'3rem 4rem' }}>
					<img style={{ width: '100%' }} alt="videoDeatil" src={'/assets/logo-og.png'}/> {/*src 자리에 filePath가 들어가야함 */}
						<List.Item
							actions={[subcribeButton]}
						>
							
							<List.Item.Meta
								avatar={<Avatar src={VideoDetail.writer.image} />}
								title={VideoDetail.writer.name}
								description={VideoDetail.description}
							/>

						</List.Item>
					
					{/* <Comments /> */}
					<Comment refreshFunction={updateComment} commentLists={Comments}  postId={videoId} />
					
					
				</div>	
					
					
				</Col>
				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>
			</Row>
	)
		
		
	} else {
		return <div>Loading...</div>
	}

	
	
}

export default VideoDetailPage