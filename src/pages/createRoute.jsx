import styled from '@emotion/styled';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

import loadRoute from '../utils/loadRoute';
import saveRoute from '../utils/saveRoute';

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
				x: pos.x,
				y: pos.y,
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

	const handleEditButton = () => {
		setEditMode(!editMode);
	};

	return (
		<div className="content">
			<ButtonGroup>
				<input
					type="text"
					onChange={(e) => setLoadInput(e.currentTarget.value)}
				/>
				<Button
					variant="outlined"
					onClick={() => loadRoute(loadInput, setCircles)}
				>
					Load
				</Button>
				<Button variant="outlined" onClick={() => saveRoute(circles)}>
					Save
				</Button>
			</ButtonGroup>
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
				<div style={{ backgroundImage: "url('../assets/spraywall.png')" }}>
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
									x={circle.x}
									y={circle.y}
									stroke={circle.strokeColor}
									strokeWidth={5}
									// fill="#fff"
									draggable={false}
									radius={circle.circleRadius}
								></Circle>
							))}
						</Layer>
					</Stage>
				</div>
			</FlexDiv>
		</div>
	);
}

export default CreateRoute;
