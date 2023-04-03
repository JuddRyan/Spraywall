import { useState, useEffect } from 'react';

import fetchRoutes from '../utils/fetchRoutes';

const Home = () => {
	const [routes, setRoutes] = useState([]);

	useEffect(() => {
		fetchRoutes((e) => {
			console.table(e);
			setRoutes(e);
		});
	}, []);

	return (
		<div className="">
			<h2>Newest routes</h2>
			{routes &&
				routes.map((e, i) => (
					<div style={{ display: 'flex', flex: 'wrap', gap: '1rem' }}>
						<p key={e.title}>{e.title}</p>
						<p key={e.grade}>{e.grade}</p>
					</div>
				))}
		</div>
	);
};

export default Home;
