import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from 'react-redux'


const { TextArea } =Input
const { Title } = Typography


const PrivateOption = [
	{ value: 0, label: "Private" },
	{ value: 1, label: "Public"}
]

const CategoryOptions = [
	{ value: 0, label: "Film & Animation"},
	{ value: 1, label: "Autos & Vehicles"},
	{ value: 2, label: "Music"},
	{ value: 3, label: "Pets & Animals"}
]

const VideoUploadPage = (props) => {
	
	const [VideoTitle, setVideoTitle] = useState('')
	const [Description, serDescription] = useState('')
	const [Private, setPrivate] = useState(0)
	const [Category, setCategory] = useState('Film & Animation')

	const user = useSelector(state => state.user)
	// 썸네일 state
	// const [FilePath, setFilePath] = useState('')
	// const [Duration, setDuration] = useState('')
	// const [ThumbnailPath, setThumbnailPath] = useState('')
	
	const onTitleChange = (e) => {
		setVideoTitle(e.target.value)
	}
	
	const onDescriptionChange = (e) => {
		serDescription(e.target.value)
	}
	
	const onPrivateChange = (e) => {
		setPrivate(e.target.value)
	}
	
	const onCategoryChange = (e) => {
		setCategory(e.target.value)
	}
	
	const onDrop = (files) => {
		let formData = new FormData;
		const config = {
			header: {'content-type': 'multipart/form-data'}
	}
		formData.append('file', files[0])
		
			axios.post('/api/video/uploads', formData, config)
			.then(response => {
				if (response.data.success) {
					console.log(response.data) // 성공하면 얻게 될 데이터
					
					// 썸네일 부분 ffmpeg sudo 오류로 현재 불가능 나중에 직접해보기
					
					// let variable = {
					// 	url: response.data.filePath,
					// 	fileName: response.data.fileName
					// }
					
					// // setFilePath(response.data.fileName)
					
					// axios.post('/api/video/thumbnail', variable)
					// .then (response => {
					// 	if (response.data.success) {
					// 		console.log(response.data) // 성공하면 얻게 될 데이터
					
					//   setDuration(response.data.fileDuration)
					// 	 setThumbnailPath(response.data.thumbsFilePath)
					// 	} else {
					// 		alert('썸네일 생성에 실패했습니다.')
					// 	}
					// })
				} else {
					alert('비디오 업로드를 실패했습니다.')
				}
			})
	}
	
	const onSubmit = (e) => {
		e.preventDefault();
		
		const variables = {
			writer: user.userData._id,
			title: VideoTitle,
			description: Description,
			privacy: Private,
			filePath: null, // 썸네일 부분
			category: Category,
			duration: null, // 썸네일 부분
			thumbnail: null // 썸네일 부분
		}
		
		axios.post('/api/video/uploadVideo', variables)
		.then(response => {
			if(response.data.success) {
				message.success('성공적으로 업로드 했습니다.')
				
				setTimeout(()=> {
					props.history.push('/')
				}, 2200)
			} else {
				alert('비디오 업로드에  실패 했습니다.')
			}
		})
	}
	
	return (
		<div style={{ maxWidth:'700px', margin:'2rem auto' }}>
			<div style={{ textAlign:'center', marginBottom:'2rem' }}>
				<Title level={2}>Upload Video</Title>
			</div>
			
			<Form onSubmit={onSubmit}>
				<div style={{ display:'flex', justifyContent:'space-between' }}>
							{/* Drop zone */}
					<Dropzone
						onDrop={onDrop}
						multiple={false}
						maxSize={9000000000}
					>
						{({ getRootProps, getInputProps }) => (
							<div style={{ width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
								alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
								<input {...getInputProps()} />
								<Icon type="plus" style={{ fontSize:'3rem' }} />
							</div>
						)}
					</Dropzone>
					
							{/* Thumbnail */}
					{/* <div>
						<img src={ㅁㄴㅇ} alt="thumbnail"/>
					</div> */}
				</div>
			
				<br />
				<br />
				<label>Title</label>	
				<Input
					onChange={onTitleChange}
					value={VideoTitle}
				/>

				<br />
				<br />
				<label>Description</label>
				<TextArea
					onChange={onDescriptionChange}
					value={Description}
				/>
				
				
				<br />
				<br />
				<select onChange={onPrivateChange}>
					{PrivateOption.map((item, index) => (
						<option key={index} value={item.value}>{item.label}</option>
					))}
				</select>
				
				
				<br />
				<br />
				<select onChange={onCategoryChange}>
					{CategoryOptions.map((item, index) => (
						<option key={index} value={item.value}>{item.label}</option>
					))}
				</select>
				
				<br />
				<br />
				<Button type="primary" size="large" onClick={onSubmit}>
					Submit
				</Button>
				
			
			</Form>
			
			
		</div>
	)
}	

export default VideoUploadPage