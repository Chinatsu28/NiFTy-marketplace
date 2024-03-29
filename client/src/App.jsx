// Team members:
// 1. Tuan Hung Lo - ID: 103842425
// 2. Chi Duc Luong - ID: 104181721
// 3. Thanh An Ho - ID: 104177364
// 4. Tran Bao Kien Le - ID: 104223584
import { BrowserRouter , Routes , Route } from "react-router-dom";
import styled from "styled-components";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Dashboard from "./components/HomeScreen.jsx";
import Explore from "./components/ExploreScreen.jsx";
import ProductScreen from "./components/ProductScreen.jsx";
import ProfileScreen from "./components/ProfileScreen.jsx";
import WalletPage from "./components/WalletPage.jsx";
import PaymentDialogDemo from "./components/PurchaseScreen.jsx";
import OwnedProduct from "./components/OwnedProduct.jsx";
import SalesProduct from "./components/SalesProduct.jsx";
import AddProduct from "./components/AddProduct.jsx";

function App() {
	const StyledCounter = styled.div `
		height: auto;
		position: relative;
		::-webkit-scrollbar {
  			display: none;
		}
	`;

	const Main = styled.div `
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		::-webkit-scrollbar {
  			display: none;
		}
		background-color: #101010;
	`;

	return(
		<BrowserRouter>
			<StyledCounter>
				<Main>
					<Routes>
						<Route path="/" element={<LoginPage/>}></Route>
						<Route path="/register" element={<RegisterPage/>}></Route>
						<Route path="/home" element={<><NavBar/><Dashboard/><Footer /></>}></Route>
						<Route path="/explore" element={<><NavBar/><Explore/><Footer /></>}></Route>
						<Route path="/wallet" element={<><NavBar/><WalletPage/><Footer /></>}></Route>
						<Route path="/product" element={<><NavBar/><ProductScreen/><Footer /></>}></Route>
						<Route path="/profile" element={<><NavBar/><ProfileScreen/><Footer /></>}></Route>
						<Route path="/test" element={<><NavBar/><PaymentDialogDemo /><Footer /></>}></Route>
						<Route path="/owned" element={<><NavBar/><OwnedProduct /><Footer /></>}></Route>
						<Route path="/sales" element={<><NavBar/><SalesProduct /><Footer /></>}></Route>
						<Route path="/addproduct" element={<><NavBar/><AddProduct /><Footer /></>}></Route>
						<Route path="*" element={<><NavBar/><ErrorPage/><Footer /></>}></Route>
					</Routes>
				</Main>
			</StyledCounter>
		</BrowserRouter>	
	);
}

export default App
