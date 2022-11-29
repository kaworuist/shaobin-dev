const data = {
	code: 200,
	data: [
		{ icon: 'HomeOutlined', title: '首页', path: '/home/index' },
		{ icon: 'AreaChartOutlined', title: '数据大屏', path: '/dataScreen/index' },
		{
			icon: 'TableOutlined',
			title: '超级表格',
			path: '/proTable',
			children: [
				{ icon: 'AppstoreOutlined', path: '/proTable/useHooks', title: '使用 Hooks' },
				{ icon: 'AppstoreOutlined', path: '/proTable/useComponent', title: '使用 Component' },
			],
		},
		{
			icon: 'ProfileOutlined',
			title: '菜单嵌套',
			path: '/menu',
			children: [
				{ icon: 'AppstoreOutlined', path: '/menu/menu1', title: '菜单1' },
				{
					icon: 'AppstoreOutlined',
					path: '/menu/menu2',
					title: '菜单2',
					children: [
						{ icon: 'AppstoreOutlined', path: '/menu/menu2/menu21', title: '菜单2-1' },
						{
							icon: 'AppstoreOutlined',
							path: '/menu/menu2/menu22',
							title: '菜单2-2',
							children: [
								{ icon: 'AppstoreOutlined', path: '/menu/menu2/menu22/menu221', title: '菜单2-2-1' },
								{ icon: 'AppstoreOutlined', path: '/menu/menu2/menu22/menu222', title: '菜单2-2-2' },
							],
						},
						{ icon: 'AppstoreOutlined', path: '/menu/menu2/menu23', title: '菜单2-3' },
					],
				},
				{ icon: 'AppstoreOutlined', path: '/menu/menu3', title: '菜单3' },
			],
		},
	],
	msg: '成功',
};

export const getMenuList = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(data.data);
		}, 500);
	});
};
