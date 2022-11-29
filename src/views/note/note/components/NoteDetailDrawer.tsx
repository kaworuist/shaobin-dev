/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-27 09:54:17
 * @Description:
 */
import { NoteModel } from '@/api/modules/note_note';
import { formatDate2M } from '@/utils/date';
import { Button, Drawer } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import '../note.less';

interface IProps {
	currentPage: number;
	getTableData: Function;
}

const NoteDetailDrawer = (props: IProps, ref: any) => {
	const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
	const [detailInfo, setDetailInfo] = useState<NoteModel.NoteBean>();

	useImperativeHandle(ref, () => ({
		setDrawerFormDetail,
	}));

	// 回显数据
	const setDrawerFormDetail = (record: NoteModel.NoteBean) => {
		setDrawerVisible(true);
		setDetailInfo(record);
	};

	// 弹框取消
	const handleCancel = () => {
		setDrawerVisible(false);
		// getTableData(currentPage);
	};
	return (
		<Drawer
			className="note_drawer_con"
			title="短信详情"
			placement="right"
			width={576}
			visible={drawerVisible}
			onClose={handleCancel}
		>
			<div className="detail_con">
				<div className="row">
					<div className="title"> 短信来源： </div>
					<div className="content"> {detailInfo?.source} </div>
				</div>
				<div className="row">
					<div className="title"> 短信类型： </div>
					<div className="content">{detailInfo?.type}</div>
				</div>
				<div className="row">
					<div className="title"> 关键字： </div>
					<div className="content"> {detailInfo?.keywords.join(',')} </div>
				</div>
				<div className="row">
					<div className="title"> 接收时间： </div>
					<div className="content">{formatDate2M(Number(detailInfo?.receiptTime))}</div>
				</div>
				<div className="row">
					<div className="title"> 短信内容： </div>
					<div className="content">{detailInfo?.noteMsg}</div>
				</div>
				<div className="row">
					<div className="title"> 通知方式： </div>
					<div className="content">
						{detailInfo?.informMethods.map(item => (item === 1 ? '短信通知' : item === 2 ? '短信通知与电话通知' : '')).join(',')}{' '}
					</div>
				</div>
				<div className="row">
					<div className="title"> 通知对象： </div>
					<div className="content">{detailInfo?.informObjects.map(item => item.name).join(',')} </div>
				</div>
			</div>
			<div className="btn">
				<Button type="primary" onClick={handleCancel}>
					关闭
				</Button>
			</div>
		</Drawer>
	);
};

export default forwardRef(NoteDetailDrawer);
