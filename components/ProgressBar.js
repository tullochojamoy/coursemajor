import React, { useState } from "react";
//import './Progress.css';

const Progress = ({done, height=20, fontSize=20}) => {
	console.log(done);
	const [style, setStyle] = useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`,
			fontSize: `${fontSize}px`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<div className="progress" style={{height:`${height}px`}}>
			<div className="progress-done" style={style}>
				{done}%
			</div>
		</div>
	)
}

export default Progress;