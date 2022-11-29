import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from '@/routers/interface';
import constantRoutes from './constantRoutes';
// * 导入所有router
const metaRouters = import.meta.globEager('./modules/*.tsx');

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: '/',
		element: <Navigate to="/login" />,
	},
	...constantRoutes,
	...routerArray,
	{
		path: '*',
		element: <Navigate to="/404" />,
	},
];

/**
 * @description: 根据路由生成入库初始化数据
 * @param {any} menuList
 * @param {any} newArr
 * @return {*}
 */
const formatLocalMenuToBack = (menuList: any[], newArr: any[] = []) => {
	menuList.forEach(item => {
		if (!item?.children?.length)
			return newArr.push({ hidden: item?.meta?.hidden, icon: item?.meta?.icon, title: item.meta.title, path: `${item.path}` });
		if (item.children.length === 1)
			return newArr.push({
				hidden: item?.meta?.hidden,
				icon: item?.meta?.icon,
				title: item.children[0].meta.title,
				path: `${item.children[0].path}`,
			});
		newArr.push({
			hidden: item?.meta?.hidden,
			icon: item?.meta?.icon,
			title: item.meta.title,
			path: item.path,
			children: formatLocalMenuToBack(item.children),
		});
	});
	return newArr;
};

export const getLocalMenu = () => {
	let arr = formatLocalMenuToBack(routerArray);
	// console.log('路由转成菜单[模拟后端返回]: ', arr);
	return arr;
};

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
