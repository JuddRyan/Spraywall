import {
	createBrowserRouter,
	createRoutesFromElements,
	Link,
	Outlet,
	Route,
	RouterProvider,
} from 'react-router-dom';
import './App.css';
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
		<div className="App">
			<RouterProvider router={router} />
			{/* <ul>
				<Link to="/">Home</Link>
				<Link to="/createRoute">createRoute</Link>
			</ul> */}
		</div>
	);
}

const Root = () => {
	return (
		<>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/createRoute">createRoute</Link>
				</li>
			</ul>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default App;
