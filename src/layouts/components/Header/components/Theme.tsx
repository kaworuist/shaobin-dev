import { Drawer, Divider, Switch, message } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import { FireOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';
import { setWeakOrGray } from '@/redux-ts/global.slice';


export default (props: any) => {
	const [visible, setVisible] = useState<boolean>(false);
	// const { setWeakOrGray } = props;
	// const { weakOrGray } = props.themeConfig;
	const dispatch = useAppDispatch()
	const weakOrGray = useAppSelector(state => state.global.themeConfig.weakOrGray)

	const onChange = (checked: boolean, theme: string) => {
		if (checked) return dispatch(setWeakOrGray(theme));
		dispatch(setWeakOrGray(''));
	};

	return (
		<>
			<i
				className="icon-style iconfont icon-zhuti"
				onClick={() => {
					setVisible(true);
				}}
			></i>
			<Drawer
				title="布局设置"
				closable={false}
				onClose={() => {
					setVisible(false);
				}}
				visible={visible}
				width={320}
			>
				<Divider className="divider">
					<FireOutlined />
					全局主题
				</Divider>
				<div className="theme-item">
					<span>暗黑模式（未完成）</span>
					<Switch
						checkedChildren={<>🌞</>}
						unCheckedChildren={<>🌜</>}
						onChange={() => {
							message.success('欢迎提交 pull request ✨');
						}}
					/>
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch
						checked={weakOrGray === 'gray'}
						onChange={e => {
							onChange(e, 'gray');
						}}
					/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch
						checked={weakOrGray === 'weak'}
						onChange={e => {
							onChange(e, 'weak');
						}}
					/>
				</div>
			</Drawer>
		</>
	);
};

// const mapStateToProps = (state: any) => state.global;
// const mapDispatchToProps = { setWeakOrGray };

