import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';


function ReplyComment(props) {
	
	const [ChildCommentNumber, setChildCommentNumber] = useState(0)
	const [OpenReplyComments, setOpenReplyComments] = useState(false)
	
	 useEffect(() => {

        let commentNumber = 0;
        props.commentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentLists, props.parentCommentId ])
	
let renderReplyComment = (parentCommentId) =>
	props.commentLists.map((comment, index) => (
		<>
			{comment.responseTo === parentCommentId &&
				<div style={{ width: '80%', marginLeft: '40px' }}>
					<SingleComment comment={comment} postId={props.videoId} refreshFunction={props.refreshFunction} />
					<ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} postId={props.videoId} refreshFunction={props.refreshFunction} />
				</div>
			}
		</>
	))
	
	 const handleChange = () => {
      setOpenReplyComments(!OpenReplyComments)
    }

	
	return (
		<div>	
			{ChildCommentNumber > 0 && 
				<div style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={handleChange}>
						View {ChildCommentNumber} more comment(s)
				</div>
			}
			
				{OpenReplyComments &&
					renderReplyComment(props.parentCommentId)
				}

		</div>
	)
}

export default ReplyComment