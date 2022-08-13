import React, {useEffect, useState} from 'react'
import axios from 'axios'


function SideVideo() {
	
	const [sideVideos, setSideVideos] = useState([])
	
	
	 useEffect(() => {
		axios.get('/api/video/getVideos')
			.then(response => {
				if (response.data.success) {
						setSideVideos(response.data.videos)
				} else {
						alert('비디오 가져오기를 실패 했습니다.')
					}
				})
	}, [])
	
	
	const renderSideVideo = sideVideos.map((video, index) => {
		
		var minutes = Math.floor(video.duration / 60);
		var seconds = Math.floor(video.duration - minutes * 60);
		
		return <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
        <div style={{ width:'40%', marginRight:'1rem' }}>
          <a href={`/video/${video._id}`}  style={{ color:'gray' }}>
            <img style={{ width: '100%' }} alt="thumbnail" src={'/assets/logo-og.png'} /> {/* 썸네일 받아오기*/}
          </a>
        </div>

        <div style={{ width:'50%' }}>
            <a style={{ color:'gray' }}>
                <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views} views</span><br />
                <span>{minutes} : 30</span><br /> {/*duration 없어서 고정 값*/}
            </a>
        </div>
    </div>
		
	})
	
	return (
		<>
			<div style={{marginTop:'3rem'}}></div>
			{renderSideVideo}
		</>
	)
}

export default SideVideo