import { useRef, useState } from 'react';
import './App.css';

function App() {
	const [position, setPosition] = useState([0, 0]);
	const [positionPixels, setPositionPixels] = useState([0, 0]);
	const [canvasSize, setCanvasSize] = useState([0, 0]);
	const canvasRef = useRef();

	const getMousePosition = (e) => {
		const canvasHeight = e.nativeEvent.explicitOriginalTarget.clientHeight;
		const canvasWidth = e.nativeEvent.explicitOriginalTarget.clientWidth;

		setCanvasSize([canvasHeight, canvasWidth]);

		const rect = e.currentTarget.getBoundingClientRect();

		let xPosition = e.clientX - rect.left;
		let yPosition = e.clientY - rect.top;

		setPositionPixels([xPosition, yPosition]);

		let xPercentage = Math.round((xPosition / canvasWidth) * 100);
		let yPercentage = Math.round((yPosition / canvasHeight) * 100);

		setPosition([xPercentage, yPercentage]);
	};

	const drawCircle = (e) => {
		e.preventDefault();

		const canvasContext = canvasRef.current.getContext('2d');
		canvasContext.beginPath();
		canvasContext.arc(300, 150, 3, 0, 2 * Math.PI);
		canvasContext.stroke();
	};

	return (
		<div className="App">
			<p>Mouse Position: {`x:${position[0]}%, y:${position[1]}%`}</p>
			<canvas
				ref={canvasRef}
				className="templateBox"
				onPointerMove={getMousePosition}
				onPointerDown={drawCircle}
			></canvas>
		</div>
	);
}

export default App;
