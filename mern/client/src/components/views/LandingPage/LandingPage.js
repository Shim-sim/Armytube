import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Icon, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography
const { Meta } = Card

function LandingPage() {
	
	const [Videos, setVideos] = useState([])
	
  useEffect(() => {
		axios.get('/api/video/getVideos')
		.then(response => {
			if (response.data.success) {
				console.log(response.data.videos)
				setVideos(response.data.videos)
			} else {
					alert('비디오 가져오기를 실패 했습니다.')
				}
			})
	}, [])
	
	 const renderCards = Videos.map((video, index) => {
		 
		var minutes = Math.floor(video.duration / 60);
		var seconds = Math.floor(video.duration - minutes * 60); // duration은 모두 second로 돼있어서 이러한 결과값

		return <Col lg={6} md={8} xs={24} key={video.privacy}>
			<div style={{ position: 'relative' }}>
				<a href={`/video/${video._id}`} >
				<img style={{ width: '100%' }} alt="thumbnail" src={'/assets/logo-og.png'} /> {/*localhost:5000/${video.thumbnail 기존은 접속주소} 데이터받아오기   */}
				<div className="duration"
						style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
						color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
						padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
						fontWeight:'500', lineHeight:'12px' }}>
						<span>{minutes} : {30}</span> {/*duration 저장안해서 고정 값*/}
				</div>
				</a>
			</div><br />
			<Meta
				avatar={
						<Avatar src={video.writer.image} />
				}
				title={video.title} />
			 
			<span>{video.writer.name} </span><br />
			<span style={{ marginLeft: '3rem' }}> {video.views}</span>
			- <span> {moment(video.createdAt).format("MMM Do YY")} </span>
		</Col>

    })
	
	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<Title level={2} > Recommended </Title>
				<hr />

				<Row gutter={[32, 16]}>
						{renderCards}
				</Row>
		</div>
	)
}

export default LandingPage
