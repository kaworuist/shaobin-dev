/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-26 10:26:25
 * @Description:
 */
import { getNoteList, NoteModel } from '@/api/modules/note_note';
import CustomTable, { SearchOption } from '@/components/CustomTable/CustomTable';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import './note.less';
import NoteDetailDrawer from './components/NoteDetailDrawer';
import { formatDate2M } from '@/utils/date';

const Note: React.FC = () => {
	const NoteDetailDrawerRef = useRef<any>();
	// 每页条数
	const [pageSize, setPageSize] = useState<number>(10);
	// 当前页
	const [currentPage, setCurrentPage] = useState(1);
	// 总条数
	const [total, setTotal] = useState<number>(0);
	// 表格数据
	const [dataSource, setDataSource] = useState<NoteModel.NoteBean[]>([]);

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
		{
			name: 'receiptTime',
			type: 'dateRange',
		},
	];

	// 表格列配置
	const columns: ColumnsType<NoteModel.NoteBean> = [
		{
			title: '短信来源',
			dataIndex: 'source',
			width: 197,
		},
		{
			title: '短信类型',
			dataIndex: 'type',
			width: 197,
		},
		{
			title: '关键字',
			dataIndex: 'keywords',
			width: 158,
			render: (_text: Array<string>) => _text.map(item => item).join(','),
		},
		{
			title: '接收时间',
			dataIndex: 'receiptTime',
			width: 197,
			render: (_text: number) => formatDate2M(_text),
		},
		{
			title: '短信内容',
			dataIndex: 'noteMsg',
			width: 197,
		},

		{
			title: '通知对象',
			dataIndex: 'informObjects',
			width: 197,
			render: (_text: Array<{ name: string; id: number }>) => _text.map(item => item.name).join(','),
		},
		{
			title: '通知方式',
			dataIndex: 'informMethods',
			width: 197,
			render: (_text: Array<number>) =>
				_text.map(item => (item === 1 ? '短信通知' : item === 2 ? '短信通知与电话通知' : '')).join(','),
		},
		{
			width: 120,
			title: '操作',
			render: (_text, record: NoteModel.NoteBean) => (
				<>
					<Button type="primary" onClick={() => toAddPage(record)}>
						详情
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
	const searchHandle = (searchForm: Partial<NoteModel.NoteBean>) => {
		if (searchForm) {
			searchForm = {
				...searchForm,
				keyword: searchForm.keywords,
				beginTime: searchForm.receiptTime && searchForm.receiptTime[0],
				endTime: searchForm.receiptTime && searchForm.receiptTime[1],
			};
		}
		getTableData(1, 10, searchForm);
	};

	// 获取列表数据
	const getTableData = async (
		pageNo: number = currentPage,
		_pageSize: number = pageSize,
		searchForm: Partial<NoteModel.NoteBean> = {}
	) => {
		const ajaxjson = {
			pageNo,
			pageSize: _pageSize,
			...searchForm,
		};
		const { data } = await getNoteList(ajaxjson);
		if (data?.list) setDataSource(data.list);
		if (data?.total) setTotal(data.total);
	};

	// 详情
	const toAddPage = async (record: NoteModel.NoteBean | number) => {
		NoteDetailDrawerRef.current.setDrawerFormDetail(record, '类型');
	};

	useEffect(() => {
		getTableData();
	}, []);

	return (
		<div className="note_con">
			<CustomTable
				searchOptions={searchOptions}
				searchHandle={searchHandle}
				columns={columns}
				dataSource={dataSource}
				total={total}
				currentPage={currentPage}
				pageSize={pageSize}
				pageChange={pageChange}
			></CustomTable>
			<NoteDetailDrawer ref={NoteDetailDrawerRef} currentPage={currentPage} getTableData={getTableData} />
		</div>
	);
};

export default Note;
