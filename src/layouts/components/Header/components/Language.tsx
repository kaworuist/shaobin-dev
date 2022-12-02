import { setLanguage } from '@/redux-ts/global.slice';
import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';
import { Dropdown, Menu } from 'antd';
import { connect } from 'react-redux';

export default (props: any) => {
	// const { language, setLanguage } = props;
	const language = useAppSelector(state => state.global.language)
	const dispatch = useAppDispatch()

	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: <span>简体中文</span>,
					onClick: () => dispatch(setLanguage('zh')),
					disabled: language === 'zh',
				},
				{
					key: '2',
					label: <span>English</span>,
					onClick: () => dispatch(setLanguage('en')),
					disabled: language === 'en',
				},
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} placement="bottom" trigger={['click']} arrow={true}>
			<i className="icon-style iconfont icon-zhongyingwen"></i>
		</Dropdown>
	);
};

// const mapStateToProps = (state: any) => state.global;
// const mapDispatchToProps = { setLanguage };
