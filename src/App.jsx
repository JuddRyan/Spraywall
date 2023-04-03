import {
	createBrowserRouter,
	createRoutesFromElements,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router-dom';

import ResponsiveAppBar from './components/appbar';
import CreateRoute from './pages/createRoute';
import Home from './pages/Home';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route element={<Root />}>
				<Route path="/" element={<Home />} />
				<Route path="/createRoute" element={<CreateRoute />} />
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

const Root = () => {
	return (
		<>
			<ResponsiveAppBar></ResponsiveAppBar>
			<Outlet />
		</>
	);
};

export default App;
