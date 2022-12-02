import { useRef } from 'react';
import { Avatar, Modal, Menu, Dropdown, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { connect } from 'react-redux';

import PasswordModal from './PasswordModal';
import InfoModal from './InfoModal';
import avatar from '@/assets/images/avatar.png';
import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';
import { setToken } from '@/redux-ts/global.slice';

export default (props: any) => {
	// const { setToken, username } = props;
	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	const username = useAppSelector(state => state.global.userInfo.username)

	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}
	const passRef = useRef<ModalProps>(null);
	const infoRef = useRef<ModalProps>(null);

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: '温馨提示',
			icon: <ExclamationCircleOutlined />,
			content: '是否确认退出登录？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				dispatch(setToken(''));
				message.success('退出登录成功！');
				navigate('/login');
			},
		});
	};

	// Dropdown Menu
	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: <span className="dropdown-item">首页</span>,
					onClick: () => navigate(HOME_URL),
				},
				/* {
					key: '2',
					label: <span className="dropdown-item">个人信息</span>,
					onClick: () => infoRef.current!.showModal({ name: 11 }),
				}, */
				/* {
					key: '3',
					label: <span className="dropdown-item">修改密码</span>,
					onClick: () => passRef.current!.showModal({ name: 11 }),
				}, */
				{
					type: 'divider',
				},
				{
					key: '4',
					label: <span className="dropdown-item">退出登录</span>,
					onClick: logout,
				},
			]}
		></Menu>
	);
	return (
		<>
			<span className="username">{username}</span>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={['click']}>
				<Avatar size="large" src={avatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};

// const mapStateToProps = (state: any) => state.global.userInfo;
// const mapDispatchToProps = { setToken };
