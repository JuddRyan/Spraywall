import {
	createBrowserRouter,
	createRoutesFromElements,
	Link,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/appbar';
import CreateRoute from './pages/createRoute';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />}>
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
