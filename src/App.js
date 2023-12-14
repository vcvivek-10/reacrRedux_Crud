import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Users from './Component/Users';
import CreateUser from './Pages/createUser/CreateUser';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { ToastContainer } from 'react-toastify';
import Header from './Component/Header';

function App() {
	return (
		<Provider store={store}>
			<Router>
			<Header/>
				<Routes>
					<Route path='/reacrRedux_Crud' element={<CreateUser />} />
					<Route path='/users' element={<Users />} />
				</Routes>
			</Router>
			<ToastContainer position='top-right'></ToastContainer>
		</Provider>
	);
}

export default App;
