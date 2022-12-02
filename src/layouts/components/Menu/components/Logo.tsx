import logo from '@/assets/images/logo.png';
import { useAppSelector } from '@/redux-ts/hook';
import { connect } from 'react-redux';

export default (props: any) => {
	// const { isCollapse } = props;
	const isCollapse = useAppSelector(state => state.menu.isCollapse)
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">哨兵后台管理</h2> : null}
		</div>
	);
};

// const mapStateToProps = (state: any) => state.menu;
