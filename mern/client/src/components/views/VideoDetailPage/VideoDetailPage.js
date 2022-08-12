import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import axios from 'axios'

function VideoDetailPage(props) {
	
	const videoId = props.match.params.videoId
	const variable = { videoId: videoId }
	
	const [VideoDetail, setVideoDetail] = useState([])
	
	useEffect(()=> {
		
		axios.post('/api/video/getVideoDetail', variable)
		.then(response => {
			if(response.data.success) {
				console.log(response.data.videoDetail)
				setVideoDetail(response.data.videoDetail)
			} else {
				alert('비디오 정보를 가져오길 실패했습니다.')
			}
		})
		
	}, [])
	
	if(VideoDetail.writer) {
			return (
			<Row gutter={[16, 16]}>
				<Col lg={18} xs={24}>
					
				<div style={{ width: '100%', padding:'3rem 4rem' }}>
					<video style={{ width:'100%' }} src={'logo-og.png'}/> {/*src 자리에 filePath가 들어가야함 */}
						<List.Item
							actions
						>
							
							<List.Item.Meta
								avatar={<Avatar src={VideoDetail.writer.image} />}
								title
								description
							/>

						</List.Item>
					
					{/* Comments */}
					
					
				</div>	
					
					
					
				</Col>
				<Col lg={6} xs={24}>
					Side Video
				</Col>
			</Row>
	)
	} else {
		return <div>Loading...</div>
	}

	
	
}

export default VideoDetailPage