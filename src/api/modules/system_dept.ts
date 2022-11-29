/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-10-25 18:37:39
 * @Description:部门管理
 */
import { ReqPage } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

// 部门模型
export namespace DeptModel {
	export interface DeptBean {
		createTime: number;
		email: string;
		id: number;
		leaderUserId: number | string;
		name: string;
		parentId: number;
		parentIds?: Array<number>; // 级联选择组件数据回显使用
		phone: string;
		sort: number;
		status: number;
	}
	export interface ReqParams extends ReqPage, DeptBean {}
}

/**
 * @description: 获取部门列表
 * @param {Partial} params
 * @return {*}
 */
export const getDeptList = (params: Partial<DeptModel.ReqParams>) => {
	return http.get<Array<DeptModel.DeptBean>>(PORT + `/system/dept/list`, params);
};

/**
 * @description: 获取部门详情
 * @param {Partial} params
 * @return {*}
 */
export const getDeptInfo = (params: Partial<DeptModel.DeptBean>) => {
	return http.get<DeptModel.DeptBean>(PORT + `/system/dept/get`, params);
};

/**
 * @description: 新增部门
 * @param {Partial} params
 * @return {*}
 */
export const addDept = (params: Partial<DeptModel.DeptBean>) => {
	return http.post(PORT + `/system/dept/create`, params);
};

/**
 * @description: 编辑部门
 * @param {Partial} params
 * @return {*}
 */
export const updateDept = (params: Partial<DeptModel.DeptBean>) => {
	return http.put(PORT + `/system/dept/update`, params);
};

/**
 * @description: 删除部门
 * @param {object} params
 * @return {*}
 */
export const deleteDept = (params: { id: number }) => {
	return http.delete(PORT + `/system/dept/delete`, params);
};
