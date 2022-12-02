import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';
import { updateCollapse } from '@/redux-ts/menu.slice';

export default (props: any) => {
	// const { isCollapse, updateCollapse } = props;
	const dispatch = useAppDispatch()
	const isCollapse = useAppSelector(state => state.menu.isCollapse)
	return (
		<div
			className="collapsed"
			onClick={() => {
				dispatch(updateCollapse(!isCollapse));
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

// const mapStateToProps = (state: any) => state.menu;
// const mapDispatchToProps = { updateCollapse };
