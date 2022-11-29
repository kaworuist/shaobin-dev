/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-22 10:59:25
 * @Description:
 */

import { dateRange2Time } from '@/utils/date';
import download from '@/utils/download';
import { Button, Table, TablePaginationConfig, Form, Select, Input, DatePicker, Cascader, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { DefaultOptionType } from 'antd/es/cascader';
import './CustomTable.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

type recordItem = {
	id: number;
	[x: string]: any;
};

// 搜索表单项
export interface SearchOption {
	name: string; //字段名
	type: 'input' | 'select' | 'dateRange' | 'cascader'; //表单类型
	options?: Array<{ name?: string; value?: string | number; [x: string]: any }>; // 表单类型为[select,cascader]时，下拉框数据
}
interface SearchOptionLocal extends SearchOption {
	label: string; //字段标题
}

type Column = {
	[x: string]: any;
};

// 操作按钮【新增，导出。。。】
interface IBtns {
	add: Function;
	export: Function;
}

interface IProps {
	tableName?: string; // 列表名字（用途：导出数据时拼接文件名字）
	showOrderNo?: boolean; // 是否展示首列序号
	showPagination?: boolean; // 是否展示分页器
	expandAll?: boolean; // 是否展开所有行
	searchOptions?: SearchOption[]; // 搜索栏配置
	searchHandle?: Function; // 搜索按钮回调
	btns?: Partial<IBtns>;
	columns: Array<Column>;
	dataSource: recordItem[];
	total: number;
	currentPage: number;
	pageSize: number;
	scroll?: number;
	bordered?: boolean;
	tableLoading?: boolean;
	rowSelection?: object;
	pageChange?: (page: number, pageSize: number, searchForm?: { [x: string]: any }) => void;
	children?: React.ReactNode;
}
// 筛选栏筛选项渲染
const SearchFormRender: React.FC<{ searchOptionsLocal: SearchOptionLocal[] }> = (props: {
	searchOptionsLocal: SearchOptionLocal[];
}) => {
	const { searchOptionsLocal } = props;
	return (
		<>
			{searchOptionsLocal.map(({ type, name, label, options }, index) => {
				if (type === 'input') {
					return (
						<Form.Item key={index} name={name} label={label}>
							<Input placeholder="请输入" allowClear />
						</Form.Item>
					);
				} else if (type === 'select') {
					return (
						<Form.Item key={index} name={name} label={label}>
							<Select placeholder="请选择" allowClear>
								{options?.map((item, index) => (
									<Option value={item.value} key={index + 1000}>
										{item.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					);
				} else if (type === 'dateRange') {
					// 时间区间
					return (
						<Form.Item className="w50" key={index} name={name} label={label}>
							<RangePicker allowClear />
						</Form.Item>
					);
				} else if (type === 'cascader') {
					// 级联选择
					const CascaderFilter = (inputValue: string, path: DefaultOptionType[]) =>
						path.some(option => (option.name as string).indexOf(inputValue) > -1);
					return (
						<Form.Item className="w50" key={index} name={name} label={label}>
							<Cascader
								showSearch={{ filter: CascaderFilter }}
								fieldNames={{ label: 'name', value: 'id' }}
								options={options}
								placeholder="请选择"
							/>
						</Form.Item>
					);
				} else {
					return <span></span>;
				}
			})}
		</>
	);
};

const CustomTable: React.FC<IProps> = (props: IProps) => {
	let {
		tableName = '',
		showOrderNo = true,
		showPagination = true,
		expandAll = false,
		btns,
		searchOptions,
		searchHandle,
		columns,
		dataSource,
		total,
		currentPage,
		pageSize,
		scroll = 1100,
		bordered = false,
		tableLoading = false,
		rowSelection,
		pageChange,
		children,
	} = props;

	// 加上序号列
	if (showOrderNo) {
		columns = [
			{
				title: ' 序号 ',
				width: 60,
				render: (_text: string, _record: object, index: number) => `${(currentPage - 1) * pageSize + (index + 1)}`,
			},
			...columns,
		];
	}

	// 搜索栏数据加上标题
	let searchOptionsLocal: Array<SearchOptionLocal> | null = null;
	if (searchOptions) {
		searchOptionsLocal = searchOptions.map(item => {
			const label = columns.filter(column => column?.dataIndex === item.name)[0].title;
			let newItem: SearchOptionLocal = {
				label,
				...item,
			};
			return newItem;
		});
	}

	const [form] = Form.useForm();

	// 分页器
	const pagination: TablePaginationConfig = {
		showSizeChanger: true,
		position: ['bottomCenter'],
		total,
		onChange: (page, pageSize) => pageChange!(page, pageSize, form.getFieldsValue()),
		pageSize: pageSize,
		current: currentPage,
		showTotal: total => `共 ${total} 条`,
	};

	// 提交筛选栏表单
	const onFinish = (values: any) => {
		const ajaxjson = JSON.parse(JSON.stringify(values));
		// 日期区间字段处理
		const dateRangeFields: SearchOptionLocal[] | undefined = searchOptionsLocal?.filter(item => item.type === 'dateRange');
		if (dateRangeFields) {
			for (const iterator of dateRangeFields) {
				if (ajaxjson[iterator.name]) ajaxjson[iterator.name] = dateRange2Time(ajaxjson[iterator.name]);
			}
		}
		searchHandle!(ajaxjson);
	};

	// 重置筛选栏表单
	const onReset = () => {
		form.resetFields();
		searchHandle!();
	};

	// 表格导出
	const handleExport = (ajaxHandle: Function) => {
		confirm({
			title: `确认要导出所有${tableName}数据项吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				const ajaxjson = form.getFieldsValue();
				let { createTime, deptId } = ajaxjson;
				if (createTime) {
					const times = dateRange2Time(createTime);
					ajaxjson.beginTime = times[0];
					ajaxjson.endTime = times[1];
				}
				if (deptId) {
					const deptIds = deptId as number[];
					if (deptIds.length > 0) ajaxjson.deptId = deptIds[deptIds.length - 1];
				}
				delete ajaxjson.createTime;
				console.log('ajaxjson: ', ajaxjson);
				const res = await ajaxHandle(ajaxjson);
				download.excel(res, `${tableName}数据.xls`);
			},
			onCancel() {},
		});
	};

	return (
		<div className="CustomTable_con">
			{/* 搜索栏 */}
			{searchOptionsLocal && (
				<div className="search_con">
					<Form form={form} name="search" layout="inline" onFinish={onFinish}>
						<SearchFormRender searchOptionsLocal={searchOptionsLocal} />
						<Form.Item>
							<div className="frc">
								<Button type="primary" htmlType="submit">
									查询
								</Button>
								<Button onClick={onReset}>重置</Button>
							</div>
						</Form.Item>
					</Form>
				</div>
			)}
			{/* 右上角操作按钮 */}
			<div className="table_btns_con frc">
				{btns?.add && (
					<Button type="primary" onClick={() => btns?.add!(-1)}>
						新增
					</Button>
				)}
				{btns?.export && (
					<Button type="primary" className="yellow" onClick={() => handleExport(btns?.export as Function)}>
						导出
					</Button>
				)}
				{children}
			</div>
			{/* 表格 */}
			{/* key={+new Date()}：为了控制树状表格 展开、折叠状态 */}
			<Table
				key={+new Date()}
				expandable={{ defaultExpandAllRows: expandAll }}
				tableLayout="fixed"
				scroll={{
					x: scroll,
				}}
				loading={tableLoading}
				bordered={bordered}
				columns={columns}
				dataSource={dataSource}
				pagination={showPagination && pagination}
				rowKey={record => record.id}
				rowSelection={rowSelection}
			/>
		</div>
	);
};

export default CustomTable;
