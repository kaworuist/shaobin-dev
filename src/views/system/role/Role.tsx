/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-22 09:23:51
 * @Description:角色管理
 */

import { RoleModel, getRoleList, getRoleInfo, updateRoleStatus, deleteRole, exportRole } from '@/api/modules/system_role';
import CustomTable, { SearchOption } from '@/components/CustomTable/CustomTable';
import { useEffect, useRef, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Modal, Switch, Tag, message } from 'antd';
import { formatDate2S } from '@/utils/date';
import AddRoleModal from './components/AddRoleModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Role: React.FC = () => {
	const AddRoleModalRef = useRef<any>();
	// 每页条数
	const [pageSize, setPageSize] = useState<number>(10);
	// 当前页
	const [currentPage, setCurrentPage] = useState(1);
	// 总条数
	const [total, setTotal] = useState<number>(0);
	// 表格数据
	const [dataSource, setDataSource] = useState<RoleModel.RoleBean[]>([]);

	// 表格搜索栏配置
	const searchOptions: Array<SearchOption> = [
		{
			name: 'name',
			type: 'input',
		},
		{
			name: 'code',
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
		{
			name: 'createTime',
			type: 'dateRange',
		},
	];

	// 表格列配置
	const columns: ColumnsType<RoleModel.RoleBean> = [
		{
			title: '角色编号',
			dataIndex: 'id',
			width: 80,
		},
		{
			title: '角色名称',
			dataIndex: 'name',
			width: 150,
		},
		{
			title: '角色类型',
			dataIndex: 'type',
			width: 80,
			render: (_text: number) => (_text === 1 ? <Tag color="red">内置</Tag> : <Tag color="green">自定义</Tag>),
		},
		{
			title: '角色标识',
			dataIndex: 'code',
			width: 150,
		},
		{
			title: '显示顺序',
			dataIndex: 'sort',
			width: 80,
		},
		{
			title: '状态',
			dataIndex: 'status',
			width: 80,
			render: (text: number, record: RoleModel.RoleBean) => (
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
			width: 250,
			title: '操作',
			render: (_text, record: RoleModel.RoleBean) => (
				<>
					<Button type="primary" onClick={() => toAddPage(record)}>
						修改
					</Button>
					<Button danger onClick={() => delHandle(record)}>
						删除
					</Button>
				</>
			),
		},
	];

	// 状态改变
	const statusChange = (checked: boolean, record: RoleModel.RoleBean) => {
		confirm({
			title: `确认要${checked ? '启用' : '停用'}“${record.name}”角色吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				const { data } = await updateRoleStatus({ id: record.id, status: Number(!checked) });
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
	const searchHandle = (searchForm: Partial<RoleModel.RoleBean>) => {
		getTableData(1, 10, searchForm);
	};

	// 获取列表数据
	const getTableData = async (pageNo: number = 1, pageSize: number = 10, searchForm: Partial<RoleModel.RoleBean> = {}) => {
		const ajaxjson: Partial<RoleModel.ReqParams> = {
			pageNo,
			pageSize,
			...searchForm,
		};
		const { createTime } = ajaxjson;
		if (createTime) {
			const times = createTime as unknown as string[];
			ajaxjson.beginTime = times[0];
			ajaxjson.endTime = times[1];
		}
		delete ajaxjson.createTime;
		const { data } = await getRoleList(ajaxjson);
		if (data?.list) setDataSource(data.list);
		if (data?.total) setTotal(data.total);
	};

	// 新增
	const toAddPage = async (record: RoleModel.RoleBean | number) => {
		if (typeof record === 'object' && record?.id) {
			const { data } = await getRoleInfo({ id: record.id });
			if (data) record = data;
		}
		AddRoleModalRef.current.setModalFormDetail(record, '角色');
	};

	// 删除
	const delHandle = (record: RoleModel.RoleBean) => {
		confirm({
			title: `确认要删除“${record.name}”角色吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				const { data } = await deleteRole({ id: record.id });
				getTableData(currentPage, pageSize);
				if (data) message.success(`删除成功`);
			},
			onCancel() {},
		});
	};

	useEffect(() => {
		getTableData();
	}, []);

	return (
		<div className="Role_con">
			<CustomTable
				tableName="角色"
				searchOptions={searchOptions}
				searchHandle={searchHandle}
				btns={{ add: toAddPage, export: exportRole }}
				columns={columns}
				dataSource={dataSource}
				total={total}
				currentPage={currentPage}
				pageSize={pageSize}
				pageChange={pageChange}
			>
				{/* <Button>一些特殊的功能按钮</Button> */}
			</CustomTable>
			<AddRoleModal ref={AddRoleModalRef} currentPage={currentPage} getTableData={getTableData}></AddRoleModal>
		</div>
	);
};

export default Role;
