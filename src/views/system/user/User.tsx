/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-22 09:23:51
 * @Description:用户管理
 */

import { UserModel, getUserList, getUserInfo, updateUserStatus, deleteUser, exportUser } from '@/api/modules/system_user';
import CustomTable, { SearchOption } from '@/components/CustomTable/CustomTable';
import { useEffect, useRef, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Modal, Switch, message, Popover, Row } from 'antd';
import { formatDate2S } from '@/utils/date';
import AddUserModal from './components/AddUserModal';
import { DeleteOutlined, ExclamationCircleOutlined, KeyOutlined, PartitionOutlined } from '@ant-design/icons';
import { DeptModel, getDeptList } from '@/api/modules/system_dept';
import { formatCascaderData, handleTree } from '@/utils/util';
import AssignRoleModal from './components/AssignRoleModal';
import { getUserRoles } from '@/api/modules/system_permission';
import UpdatePassword from './components/UpdatePassword';

const { confirm } = Modal;

const User: React.FC = () => {
	const AddUserModalRef = useRef<any>();
	const AssignRoleModalRef = useRef<any>();
	const UpdatePasswordRef = useRef<any>();
	// 每页条数
	const [pageSize, setPageSize] = useState<number>(10);
	// 当前页
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 总条数
	const [total, setTotal] = useState<number>(0);
	// 表格数据
	const [dataSource, setDataSource] = useState<UserModel.UserBean[]>([]);

	// 部门列表
	const [depts, setDepts] = useState<DeptModel.DeptBean[]>([]);
	// 部门列表--扁平状
	const [originalData, setOriginalData] = useState<DeptModel.DeptBean[]>([]);

	// 表格搜索栏配置
	const searchOptions: Array<SearchOption> = [
		{
			name: 'deptId',
			type: 'cascader',
			options: depts,
		},
		{
			name: 'createTime',
			type: 'dateRange',
		},
		{
			name: 'username',
			type: 'input',
		},
		{
			name: 'mobile',
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

	// [更多按钮]气泡卡片内容
	interface IpropsPopoverContent {
		record: UserModel.UserBean;
	}
	const PopoverContent = (props: IpropsPopoverContent) => {
		const { record } = props;
		return (
			<div>
				<Row>
					<Button icon={<DeleteOutlined />} type="link" onClick={() => delHandle(record)}>
						删除
					</Button>
				</Row>
				<Row>
					<Button icon={<KeyOutlined />} type="link" onClick={() => updatePasswordHandle(record)}>
						重置密码
					</Button>
				</Row>
				<Row>
					<Button icon={<PartitionOutlined />} type="link" onClick={() => assignRoleHandle(record)}>
						分配角色
					</Button>
				</Row>
			</div>
		);
	};

	// 表格列配置
	const columns: ColumnsType<UserModel.UserBean> = [
		{
			title: '用户编号',
			dataIndex: 'id',
			width: 80,
		},
		{
			title: '用户名称',
			dataIndex: 'username',
			width: 150,
		},
		{
			title: '用户昵称',
			dataIndex: 'nickname',
			width: 150,
		},
		{
			title: '部门',
			dataIndex: 'deptId',
			width: 150,
			render: (_text, record: UserModel.UserBean) => record?.dept?.name,
		},
		{
			title: '手机号码',
			dataIndex: 'mobile',
			width: 150,
		},
		{
			title: '状态',
			dataIndex: 'status',
			width: 80,
			render: (text: number, record: UserModel.UserBean) => (
				<Switch checked={text === 0} onChange={checked => statusChange(checked, record)} />
			),
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			width: 200,
			render: (_text: number) => formatDate2S(_text),
		},
		{
			width: 180,
			title: '操作',
			render: (_text, record: UserModel.UserBean) => (
				<>
					<Button type="primary" onClick={() => toAddPage(record)}>
						修改
					</Button>
					<Popover placement="bottom" trigger="click" content={<PopoverContent record={record} />}>
						<Button>更多</Button>
					</Popover>
				</>
			),
		},
	];

	// 状态改变
	const statusChange = (checked: boolean, record: UserModel.UserBean) => {
		confirm({
			title: `确认要${checked ? '启用' : '停用'}“${record.username}”用户吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				const { data } = await updateUserStatus({ id: record.id, status: Number(!checked) });
				getTableData(currentPage, pageSize);
				if (data) message.success(`${checked ? '启用' : '停用'}成功`);
			},
			onCancel() {},
		});
	};

	// 页码改变
	const pageChange = (page: number, size: number, searchForm: any) => {
		setCurrentPage(page);
		setPageSize(size);
		getTableData(page, size, searchForm);
	};

	// 搜索栏搜索按钮
	const searchHandle = (searchForm: Partial<UserModel.UserBean>) => {
		getTableData(1, 10, searchForm);
	};

	// 获取列表数据
	const getTableData = async (
		pageNo: number = currentPage,
		_pageSize: number = pageSize,
		searchForm: Partial<UserModel.UserBean> = {}
	) => {
		const { deptId, createTime } = searchForm;
		const ajaxjson: Partial<UserModel.ReqParams> = {
			pageNo,
			pageSize: _pageSize,
			...searchForm,
		};

		if (createTime) {
			const times = createTime as unknown as string[];
			ajaxjson.beginTime = times[0];
			ajaxjson.endTime = times[1];
		}
		delete ajaxjson.createTime;

		if (deptId) {
			const deptIds = deptId as number[];
			if (deptIds.length > 0) ajaxjson.deptId = deptIds[deptIds.length - 1];
		}
		const { data } = await getUserList(ajaxjson);
		if (data?.list) setDataSource(data.list);
		if (data?.total) setTotal(data.total);
	};

	// 重置密码
	const updatePasswordHandle = async (record: UserModel.UserBean) => {
		UpdatePasswordRef.current.setModalFormDetail(record);
	};

	// 分配角色
	const assignRoleHandle = async (record: UserModel.UserBean) => {
		const { id: userId, username, nickname } = record;
		const { data } = await getUserRoles({ userId });
		const obj = {
			userId,
			username,
			nickname,
			roleIds: data,
		};
		AssignRoleModalRef.current.setModalFormDetail(obj);
	};

	// 新增
	const toAddPage = async (record: UserModel.UserBean | number) => {
		if (typeof record === 'object' && record?.id) {
			// 修改
			const { data } = await getUserInfo({ id: record.id });
			if (data) {
				record = data;
				const { deptId } = record;
				if (deptId) {
					record.deptIds = formatCascaderData([deptId as number], originalData);
				}
			}
		}
		AddUserModalRef.current.setModalFormDetail(record, '用户');
	};

	// 删除
	const delHandle = (record: UserModel.UserBean) => {
		confirm({
			title: `确认要删除“${record.nickname}”用户吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				const { data } = await deleteUser({ id: record.id });
				getTableData(currentPage, pageSize);
				if (data) message.success(`删除成功`);
			},
			onCancel() {},
		});
	};

	// 获取部门列表数据
	const getDeptListHandle = async () => {
		const { data } = await getDeptList({});
		if (data) {
			setOriginalData(data);
			setDepts(handleTree(data, 'id'));
		}
	};

	useEffect(() => {
		getTableData();
		getDeptListHandle();
	}, []);

	return (
		<div className="User_con">
			<CustomTable
				tableName="用户"
				searchOptions={searchOptions}
				searchHandle={searchHandle}
				btns={{ add: toAddPage, export: exportUser }}
				columns={columns}
				dataSource={dataSource}
				total={total}
				currentPage={currentPage}
				pageSize={pageSize}
				pageChange={pageChange}
			></CustomTable>
			<AddUserModal ref={AddUserModalRef} currentPage={currentPage} getTableData={getTableData} deptList={depts}></AddUserModal>
			<AssignRoleModal ref={AssignRoleModalRef} currentPage={currentPage} getTableData={getTableData}></AssignRoleModal>
			<UpdatePassword ref={UpdatePasswordRef} currentPage={currentPage} getTableData={getTableData}></UpdatePassword>
		</div>
	);
};

export default User;
