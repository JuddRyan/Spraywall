import { useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import './App.css';

function App() {
	const [circles, setCircles] = useState([]);
	const [strokeColor, setStrokeColor] = useState('#f15');
	const [loadInput, setLoadInput] = useState('');

	const handlePointerDown = (e) => {
		const pos = e.target.getStage().getPointerPosition();
		setCircles([
			...circles,
			{ position: [pos.x, pos.y], strokeColor: strokeColor },
		]);
	};

	const handleHandsButton = (e) => {
		setStrokeColor('#f15');
	};

	const handleFeetButton = (e) => {
		setStrokeColor('#15f');
	};

	const handleSave = (e) => {
		const circlesStringify = JSON.stringify(circles);
		console.log(circlesStringify.toString('base64'));
		// using window.btoa instead of only btoa to prevent deprecated error from apearing
		// this error is only for nodejs and as such can currently be ignored
		const b64String = window.btoa(circlesStringify);
		navigator.clipboard.writeText(b64String);
	};

	const handleLoad = (e) => {
		const decodedString = window.atob(loadInput);

		const jsonLoad = JSON.parse(decodedString);
		setCircles(jsonLoad);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText('this is a test');
	};

	return (
		<div className="App">
			<div>
				<input
					type="text"
					onChange={(e) => setLoadInput(e.currentTarget.value)}
				/>
				<button onClick={handleLoad}>Load</button>
				<button onClick={handleSave}>Save</button>
				<button onClick={handleCopy}>Copy</button>
			</div>
			<br />
			<div>
				<button onClick={handleHandsButton}>Hands</button>
				<button onClick={handleFeetButton}>Feet</button>
			</div>
			<Stage
				width={500}
				height={500}
				className="templateBox"
				onPointerDown={handlePointerDown}
			>
				<Layer>
					{circles.map((circle, i) => (
						<Circle
							key={i}
							x={circle.position[0]}
							y={circle.position[1]}
							stroke={circle.strokeColor}
							strokeWidth={5}
							// fill="#fff"
							draggable
							radius={10}
						></Circle>
					))}
				</Layer>
			</Stage>
		</div>
	);
}

export default App;
