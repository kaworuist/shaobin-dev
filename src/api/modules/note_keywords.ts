/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-26 13:52:27
 * @Description:
 */
import { ResPage, ReqPage } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

// 关键字模型
export namespace KeywordsModel {
	export interface KeywordsBean {
		id: number;
		type: string;
		keywords: Array<string> | string;
		keyword?: Array<string> | string;
		informMethods: Array<number> | string;
		informObjects: Array<{
			id: string;
			name: string;
		}>;
	}
	export interface ReqParams extends ReqPage, KeywordsBean {}
}

/**
 * @description: 获取关键字列表
 * @param {Partial} params
 * @return {*}
 */
export const getNoteKeywordsList = (params: Partial<KeywordsModel.ReqParams>) => {
	return http.get<ResPage<KeywordsModel.KeywordsBean>>(PORT + `/note/notekeyword/page`, params);
};
/**
 * @description: 新增关键字
 * @param {Partial} params
 * @return {*}
 */
export const addNoteKeywords = (params: Partial<KeywordsModel.ReqParams>) => {
	return http.post(PORT + `/note/notekeyword/create`, params);
};

/**
 * @description: 编辑关键字
 * @param {Partial} params
 * @return {*}
 */
export const updateNoteKeywords = (params: Partial<KeywordsModel.ReqParams>) => {
	return http.put(PORT + `/note/notekeyword/update`, params);
};

/**
 * @description: 删除关键字
 * @param {object} params
 * @return {*}
 */
export const deleteNoteKeywords = (params: { id: number }) => {
	return http.delete(PORT + `/note/notekeyword/delete`, params);
};
