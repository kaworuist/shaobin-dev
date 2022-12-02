import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
// import { getAuthorButtons } from '@/api/modules/login';
import { connect } from 'react-redux';
import LayoutMenu from './components/Menu';
import LayoutHeader from './components/Header';
// import LayoutTabs from './components/Tabs';
import LayoutFooter from './components/Footer';
import './index.less';
import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';
import { updateCollapse } from '@/redux-ts/menu.slice';

export default (props: any) => {
	const { Sider, Content } = Layout;
	// const { isCollapse, updateCollapse, setAuthButtons } = props;
	const isCollapse = useAppSelector(state => state.menu.isCollapse)
	const dispatch = useAppDispatch()


	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		// TODO:
		return 0;
		// const { data } = await getAuthorButtons();
		// setAuthButtons(data);
		// setAuthButtons({});
	};

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true));
				if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false));
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		getAuthButtonsList();
	}, []);

	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			<Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				{/* <LayoutTabs></LayoutTabs> */}
				<Content>
					{/* TransitionGroup 会导致 useEffect 加载两次 && 使用路由懒加载第一次进入没有动画，所以暂时不用过渡动画了 */}
					{/* <TransitionGroup className="content"> */}
					{/* exit：表示退出当前页面的时候是否有动画 */}
					{/* <CSSTransition key={pathname} timeout={200} classNames="fade" exit={false}> */}
					<Outlet></Outlet>
					{/* </CSSTransition> */}
					{/* </TransitionGroup> */}
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
};

