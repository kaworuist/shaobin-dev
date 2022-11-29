/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-26 10:30:25
 * @Description:
 */
import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';

// 超级表格模块
const proTableRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		path: '/note',
		meta: {
			title: '短信管理',
			icon: 'MessageOutlined',
		},
		children: [
			{
				path: '/note/keywords',
				element: lazyLoad(React.lazy(() => import('@/views/note/keywords/Keywords'))),
				meta: {
					requiresAuth: true,
					title: '关键字管理',
					key: 'keywords',
				},
			},
			{
				path: '/note/note',
				element: lazyLoad(React.lazy(() => import('@/views/note/note/Note'))),
				meta: {
					requiresAuth: true,
					title: '短信列表',
					key: 'note',
				},
			},
		],
	},
];

export default proTableRouter;
