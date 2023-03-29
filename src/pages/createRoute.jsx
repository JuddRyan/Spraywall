import styled from '@emotion/styled';
import { Button, Slider } from '@mui/material';
import { useState } from 'react';
import { Circle, Group, Image, Layer, Stage } from 'react-konva';

const FlexDiv = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	align-items: center;
`;

function CreateRoute() {
	const [circles, setCircles] = useState([]);
	const [strokeColor, setStrokeColor] = useState('#f15');
	const [circleRadius, setCircleRadius] = useState(15);

	const [loadInput, setLoadInput] = useState('');
	const [editMode, setEditMode] = useState(false);

	const handlePointerDown = (e) => {
		if (!editMode) return;

		const pos = e.target.getStage().getPointerPosition();
		setCircles([
			...circles,
			{
				position: [pos.x, pos.y],
				strokeColor: strokeColor,
				circleRadius: circleRadius,
			},
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

	const handleEditButton = () => {
		setEditMode(!editMode);
	};

	return (
		<div className="content">
			<div>
				<input
					type="text"
					onChange={(e) => setLoadInput(e.currentTarget.value)}
				/>
				<Button variant="outlined" onClick={handleLoad}>
					Load
				</Button>
				<Button variant="outlined" onClick={handleSave}>
					Save
				</Button>
				<Button variant="outlined" onClick={handleCopy}>
					Copy
				</Button>
			</div>
			<FlexDiv>
				<div>
					<div>
						<p>Size:</p>
						<Slider
							defaultValue={15}
							aria-label="Default"
							valueLabelDisplay="auto"
							min={5}
							max={35}
							onChangeCommitted={(_, value) => setCircleRadius(value)}
						/>
					</div>
					<div>
						<Button variant="outlined" onClick={handleEditButton}>
							Edit Mode
						</Button>
						<Button variant="outlined" onClick={handleHandsButton}>
							Hands
						</Button>
						<Button variant="outlined" onClick={handleFeetButton}>
							Feet
						</Button>
					</div>
				</div>
				<Group>
					<Image image={'../assets/spraywall.png'} />
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
									draggable={false}
									radius={circle.circleRadius}
								></Circle>
							))}
						</Layer>
					</Stage>
				</Group>
			</FlexDiv>
		</div>
	);
}

export default CreateRoute;
