// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';
import Home from '@/views/home/index';

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		path: '/home',
		meta: {
			title: '首页',
			icon: 'HomeOutlined',
		},
		children: [
			{
				path: '/home/index',
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Home />,
				meta: {
					requiresAuth: true,
					title: '首页',
					key: 'home',
				},
			},
		],
	},
];

export default homeRouter;
