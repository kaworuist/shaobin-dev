/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-26 10:26:25
 * @Description:
 */
import { deleteNoteKeywords, getNoteKeywordsList, KeywordsModel } from '@/api/modules/note_keywords';
import CustomTable, { SearchOption } from '@/components/CustomTable/CustomTable';
import { Button, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './keywords.less';
import AddKeywordsDrawer from './components/AddKeywordsDrawer';

const { confirm } = Modal;
const Keywords: React.FC = () => {
	const AddKeywordsDrawerRef = useRef<any>();
	// 每页条数
	const [pageSize, setPageSize] = useState<number>(10);
	// 当前页
	const [currentPage, setCurrentPage] = useState(1);
	// 总条数
	const [total, setTotal] = useState<number>(0);
	// 表格数据
	const [dataSource, setDataSource] = useState<KeywordsModel.KeywordsBean[]>([]);

	// 表格搜索栏配置
	const searchOptions: Array<SearchOption> = [
		{
			name: 'keywords',
			type: 'input',
		},
		{
			name: 'type',
			type: 'input',
		},
	];

	// 表格列配置
	const columns: ColumnsType<KeywordsModel.KeywordsBean> = [
		{
			title: '短信类型',
			dataIndex: 'type',
			width: 200,
		},
		{
			title: '关键字',
			dataIndex: 'keywords',
			width: 200,
			render: (_text: Array<string>) => _text.map(item => item).join(','),
		},
		{
			title: '通知方式',
			dataIndex: 'informMethods',
			width: 200,
			render: (_text: Array<number>) =>
				_text.map(item => (item === 1 ? '短信通知' : item === 2 ? '短信通知与电话通知' : '')).join(','),
		},
		{
			title: '通知对象',
			dataIndex: 'informObjects',
			render: (_text: Array<{ name: string; id: number }>) => _text.map(item => item.name).join(','),
		},
		{
			width: 208,
			title: '操作',
			render: (_text, record: KeywordsModel.KeywordsBean) => (
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

	// 页码改变
	const pageChange = (page: number, size: number, searchForm: any) => {
		setCurrentPage(page);
		setPageSize(size);
		getTableData(page, size, searchForm);
	};

	// 搜索栏搜索按钮
	const searchHandle = (searchForm: Partial<KeywordsModel.KeywordsBean>) => {
		if (searchForm) {
			searchForm = {
				...searchForm,
				keyword: searchForm.keywords,
			};
		}
		getTableData(1, 10, searchForm);
	};

	// 获取列表数据
	const getTableData = async (
		pageNo: number = currentPage,
		_pageSize: number = pageSize,
		searchForm: Partial<KeywordsModel.KeywordsBean> = {}
	) => {
		const ajaxjson = {
			pageNo,
			pageSize: _pageSize,
			...searchForm,
		};
		const { data } = await getNoteKeywordsList(ajaxjson);
		if (data?.list) setDataSource(data.list);
		if (data?.total) setTotal(data.total);
	};

	// 新增
	const toAddPage = async (record: KeywordsModel.KeywordsBean | number) => {
		AddKeywordsDrawerRef.current.setDrawerFormDetail(record, '类型');
	};

	// 删除
	const delHandle = (record: KeywordsModel.KeywordsBean) => {
		confirm({
			title: `确认要删除吗？`,
			icon: <ExclamationCircleOutlined />,
			onOk: async () => {
				await deleteNoteKeywords({ id: record.id });
				message.success(`删除成功`);
				let page: number = currentPage;
				const totalPage = Math.ceil((total - 1) / 10);
				const pageNum = currentPage > totalPage ? totalPage : currentPage;
				page = pageNum < 1 ? 1 : pageNum;
				getTableData(page, pageSize);
				setCurrentPage(page);
			},
			onCancel() {},
		});
	};

	useEffect(() => {
		getTableData();
	}, []);

	return (
		<div className="keywords_con">
			<CustomTable
				searchOptions={searchOptions}
				searchHandle={searchHandle}
				btns={{ add: toAddPage }}
				columns={columns}
				dataSource={dataSource}
				total={total}
				currentPage={currentPage}
				pageSize={pageSize}
				pageChange={pageChange}
			></CustomTable>
			<AddKeywordsDrawer ref={AddKeywordsDrawerRef} currentPage={currentPage} getTableData={getTableData} />
		</div>
	);
};

export default Keywords;
