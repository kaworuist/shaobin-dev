import { setAssemblySize } from '@/redux-ts/global.slice';
import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';
import { Dropdown, Menu } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export default () => {
	// const { assemblySize, setAssemblySize } = props;
	const assemblySize = useAppSelector(state => state.global.assemblySize)
	const dispatch = useAppDispatch()
	// 切换组件大小
	const onClick = (e: MenuInfo) => {
		// setAssemblySize(e.key);
		dispatch(setAssemblySize(e.key as SizeType))
	};

	const menu = (
		<Menu
			items={[
				{
					key: 'middle',
					disabled: assemblySize == 'middle',
					label: <span>默认</span>,
					onClick,
				},
				{
					disabled: assemblySize == 'large',
					key: 'large',
					label: <span>大型</span>,
					onClick,
				},
				{
					disabled: assemblySize == 'small',
					key: 'small',
					label: <span>小型</span>,
					onClick,
				},
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} placement="bottom" trigger={['click']} arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};
