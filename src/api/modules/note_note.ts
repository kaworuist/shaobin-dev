/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-27 09:30:46
 * @Description:
 */
import { ResPage, ReqPage } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

// 短信模型
export namespace NoteModel {
	export interface NoteBean {
		id: number;
		source: string;
		type: string;
		keywords: Array<string>;
		keyword?: Array<string> | string;
		receiptTime: Array<string> | string;
		noteMsg: string;
		informMethods: Array<number>;
		informObjects: Array<{
			id: string;
			name: string;
		}>;
		beginTime: string;
		endTime: string;
	}
	export interface ReqParams extends ReqPage, NoteBean {}
}

/**
 * @description: 获取关键字列表
 * @param {Partial} params
 * @return {*}
 */
export const getNoteList = (params: Partial<NoteModel.ReqParams>) => {
	return http.get<ResPage<NoteModel.NoteBean>>(PORT + `/note/noterecord/page`, params);
};
