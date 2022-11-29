/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-22 09:32:45
 * @Description:系统管理模块路由
 */
import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';

// 超级表格模块
const proTableRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		path: '/system',
		meta: {
			title: '系统管理',
			icon: 'TableOutlined',
		},
		children: [
			{
				path: '/system/user',
				element: lazyLoad(React.lazy(() => import('@/views/system/user/User'))),
				meta: {
					requiresAuth: true,
					title: '用户管理',
					key: 'role',
				},
			},
			{
				path: '/system/dept',
				element: lazyLoad(React.lazy(() => import('@/views/system/dept/Dept'))),
				meta: {
					requiresAuth: true,
					title: '部门管理',
					key: 'dept',
				},
			},
			{
				path: '/system/role',
				element: lazyLoad(React.lazy(() => import('@/views/system/role/Role'))),
				meta: {
					requiresAuth: true,
					title: '角色管理',
					key: 'role',
				},
			},
		],
	},
];

export default proTableRouter;
