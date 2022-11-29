import welcome from '@/assets/images/welcome.png';
import './index.less';
// import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div className="home">
			{/* <Outlet></Outlet> */}
			<img src={welcome} alt="welcome" />
		</div>
	);
};

export default Home;
