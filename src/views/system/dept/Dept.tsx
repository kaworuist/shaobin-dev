/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-22 09:23:51
 * @Description:部门管理
 */

import { deleteDept, DeptModel, getDeptInfo, getDeptList } from '@/api/modules/system_dept';
import CustomTable, { SearchOption } from '@/components/CustomTable/CustomTable';
import { useEffect, useRef, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Modal, Tag, message } from 'antd';
import { formatDate2S } from '@/utils/date';
import AddDeptModal from './components/AddDeptModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { formatCascaderData, handleTree } from '@/utils/util';
import { UserModel, getUserAllSimple } from '@/api/modules/system_user';

const { confirm } = Modal;

const Dept: React.FC = () => {
	const AddDeptModalRef = useRef<any>();
	// 总条数
	const [total, setTotal] = useState<number>(0);
	// 表格数据--树状
	const [dataSource, setDataSource] = useState<DeptModel.DeptBean[]>([]);
	// 原始数据--扁平状
	const [originalData, setOriginalData] = useState<DeptModel.DeptBean[]>([]);

	// 全部用户列表
	const [users, setUsers] = useState<UserModel.UserBean[]>([]);

	// 表格搜索栏配置
	const searchOptions: Array<SearchOption> = [
		{
			name: 'name',
			type: 'input',
		},
		{
			name: 'status',
			type: 'select',
			options: [
				{ name: '开启', value: 0 },
				{ name: '关闭', value: 1 },
			],
		},
	];

	// 表格列配置
	const columns: ColumnsType<DeptModel.DeptBean> = [
		{
			title: '部门名称',
			dataIndex: 'name',
			width: 160,
		},
		{
			title: '负责人',
			dataIndex: 'leaderUserId',
			width: 150,
			render: (_text, record: DeptModel.DeptBean) => userNicknameFormat(record),
		},
		{
			title: '排序',
			dataIndex: 'sort',
			width: 80,
		},
		{
			title: '状态',
			dataIndex: 'status',
			width: 80,
			render: (_text: number) => (_text === 1 ? <Tag color="red">关闭</Tag> : <Tag color="green">开启</Tag>),
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			width: 200,
			render: (_text: number) => formatDate2S(_text),
		},
		{
			width: 250,
			title: '操作',
			render: (_text, record: DeptModel.DeptBean) => (
				<>
					<Button type="primary" onClick={() => toAddPage(record)}>
						修改
					</Button>
					<Button onClick={() => toAddPage(-1, record.id)}>新增</Button>
					<Button danger onClick={() => delHandle(record)}>
						删除
					</Button>
				</>
			),
		},
	];

	// 获取用户
	const getUserAllSimpleHandle = async () => {
		const { data } = await getUserAllSimple();
		if (data) setUsers(data);
	};

	// 用户昵称展示
	const userNicknameFormat = (row: DeptModel.DeptBean) => {
		if (!row.leaderUserId) {
			return '未设置';
		}
		for (const user of users) {
			if (row.leaderUserId === user.id) {
				return user.nickname;
			}
		}
		return '未知【' + row.leaderUserId + '】';
	};

	// 展开、折叠
	const [expandAll, setExpandAll] = useState<boolean>(true);
	const toggleExpandAll = () => {
		setExpandAll(pre => !pre);
	};

	// 搜索栏搜索按钮
	const searchHandle = (searchForm: Partial<DeptModel.DeptBean>) => {
		getTableData(searchForm);
	};

	// 获取列表数据
	const getTableData = async (searchForm: Partial<DeptModel.DeptBean> = {}) => {
		const ajaxjson: Partial<DeptModel.ReqParams> = {
			...searchForm,
		};
		const { data } = await getDeptList(ajaxjson);
		if (data) {
			setOriginalData(data);
			setDataSource(handleTree(data, 'id'));
			setTotal(data.length);
		}
	};

	// 新增
	const toAddPage = async (record: Partial<DeptModel.DeptBean> | number, parentId?: number) => {
		if (typeof record === 'object' && record?.id) {
			// 修改
			const { data } = await getDeptInfo({ id: record.id });
			if (data) {
				record = data;
				const { parentId } = record;
				if (parentId) {
					record.parentIds = formatCascaderData([parentId], originalData);
				}
			}
		} else if (parentId) {
			// 选中上级部门时新增
			record = {
				parentIds: formatCascaderData([parentId], originalData),
				status: 0,
			};
		}
		AddDeptModalRef.current.setModalFormDetail(record, '角色');
	};

	// 删除
	const delHandle = (record: DeptModel.DeptBean) => {
		confirm({
			title: `确认要删除“${record.name}”部门吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				const { data } = await deleteDept({ id: record.id });
				getTableData();
				if (data) message.success(`删除成功`);
			},
			onCancel() {},
		});
	};

	useEffect(() => {
		getUserAllSimpleHandle();
		getTableData();
	}, []);

	return (
		<div className="Dept_con">
			<CustomTable
				showOrderNo={false}
				showPagination={false}
				expandAll={expandAll}
				searchOptions={searchOptions}
				searchHandle={searchHandle}
				btns={{ add: toAddPage }}
				columns={columns}
				dataSource={dataSource}
				total={total}
				currentPage={1}
				pageSize={1000}
			>
				<Button onClick={toggleExpandAll}>展开/折叠</Button>
			</CustomTable>
			<AddDeptModal
				ref={AddDeptModalRef}
				currentPage={1}
				getTableData={getTableData}
				deptList={dataSource}
				users={users}
			></AddDeptModal>
		</div>
	);
};

export default Dept;
