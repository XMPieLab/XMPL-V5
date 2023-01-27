import './App.css'
import Main from './pages/Main'
import { Content } from './pages/Content'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/content',
		element: <Content />,
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
