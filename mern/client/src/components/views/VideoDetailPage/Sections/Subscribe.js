import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Subscribe(props) { 
	
	const userTo = props.userTo
	const userFrom = props.userFrom
	
	const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)
	const [Loading, setLoading] = useState(true)

	
	useEffect(() => {
		
		const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
		
		axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
		.then(response => {
			if(response.data.success) {
				setSubscribeNumber(response.data.subscribeNumber)
				setLoading(false)
			} else {
				alert('구독자 수 정보를 받아오지 못했습니다.')
			}
		})
		
		axios.post('/api/subscribe/subscribed',  subscribeNumberVariables)
		.then(response => {
			if(response.data.success) {
				setSubscribed(response.data.subscribed)
			} else {
				alert('정보를 얻어오지 못했습니다.')
			}
		})
		
		
	}, [])
	
	const onSubscribe = () => {
		
		let subscribedVariable = {
			userTo: userTo,
			userFrom: userFrom
		}
		
		// 이미 구독 중이라면
		if(Subscribed) {
			axios.post('/api/subscribe/unSubscribe',subscribedVariable )
			.then(response => {
				if(response.data.success) {
					setSubscribeNumber(SubscribeNumber - 1)
					setSubscribed(!Subscribed)

				} else {
					alert('구독 취소 하는데 실패 했습니다.')
				}
			})
			
		// 아직 구독 중이 아니라면	
		} else {
			axios.post('/api/subscribe/subscribe',subscribedVariable )
			.then(response => {
				if(response.data.success) {
					setSubscribeNumber(SubscribeNumber + 1)
					setSubscribed(!Subscribed)
				} else {
					alert('구독 하는데 실패 했습니다.')
				}
			})
			
		}
		
	}
	if(Loading) {
		return <div>Loading...</div>
	} else {
	
	return (
		<>
			<button
			 style={{
				backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
				borderRadius: '4px', color: 'white', border: 'none',
				padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
				
				onClick={onSubscribe}
			>
			
			{SubscribeNumber} {Subscribed ? '구독중' : '구독'}
			</button>
		</>
		)
	}
}

export default Subscribe