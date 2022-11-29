import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { RouteObject } from '@/routers/interface';
import Login from '@/views/login/index';

// 错误页面模块
const constantRoutes: Array<RouteObject> = [
	{
		path: '/login',
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: '登录页',
			key: 'login',
		},
	},
	/* {
		path: '/mapa',
		element: lazyLoad(React.lazy(() => import('@/views/map/MapA'))),
		meta: {
			requiresAuth: false,
			title: 'cesium地图',
			key: 'map_a',
		},
	}, */
	{
		path: '/403',
		element: lazyLoad(React.lazy(() => import('@/components/ErrorMessage/403'))),
		meta: {
			requiresAuth: false,
			title: '403页面',
			key: '403',
		},
	},
	{
		path: '/404',
		element: lazyLoad(React.lazy(() => import('@/components/ErrorMessage/404'))),
		meta: {
			requiresAuth: false,
			title: '404页面',
			key: '404',
		},
	},
	{
		path: '/500',
		element: lazyLoad(React.lazy(() => import('@/components/ErrorMessage/500'))),
		meta: {
			requiresAuth: false,
			title: '500页面',
			key: '500',
		},
	},
];

export default constantRoutes;
