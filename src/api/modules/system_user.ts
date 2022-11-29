/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-10-26 11:16:25
 * @Description:用户管理
 */
import { ResPage, ReqPage } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';
import { DeptModel } from './system_dept';

// 用户模型
export namespace UserModel {
	export interface UserBean {
		id: number;
		nickname: string;
		username: string;
		avatar: string;
		createTime: number;
		dept: DeptModel.DeptBean;
		deptId: number | number[];
		deptIds: number[];
		email: string;
		loginDate: any;
		loginIp: string;
		mobile: string;
		postIds: number[];
		remark: any;
		sex: number;
		status: number;
	}
	export interface ReqParams extends ReqPage, UserBean {
		beginTime: string;
		endTime: string;
	}
}

/**
 * @description: 获取全部用户列表（无分页）
 * @param {Partial} params
 * @return {*}
 */
export const getUserAllSimple = () => {
	return http.get<Array<UserModel.UserBean>>(PORT + `/system/user/list-all-simple`);
};

/**
 * @description: 获取用户列表（分页）
 * @param {Partial} params
 * @return {*}
 */
export const getUserList = (params: Partial<UserModel.ReqParams>) => {
	return http.get<ResPage<UserModel.UserBean>>(PORT + `/system/user/page`, params);
};

/**
 * @description: 导出用户
 * @param {Partial} params
 * @return {*}
 */
export const exportUser = (params: Partial<UserModel.ReqParams>) => {
	return http.get<BlobPart>(PORT + `/system/user/export`, params, { responseType: 'blob' });
};

/**
 * @description: 获取用户详情
 * @param {Partial} params
 * @return {*}
 */
export const getUserInfo = (params: Partial<UserModel.UserBean>) => {
	return http.get<UserModel.UserBean>(PORT + `/system/user/get`, params);
};

/**
 * @description: 新增用户
 * @param {Partial} params
 * @return {*}
 */
export const addUser = (params: Partial<UserModel.UserBean>) => {
	return http.post(PORT + `/system/user/create`, params);
};

/**
 * @description: 编辑用户
 * @param {Partial} params
 * @return {*}
 */
export const updateUser = (params: Partial<UserModel.UserBean>) => {
	return http.put(PORT + `/system/user/update`, params);
};

/**
 * @description: 删除用户
 * @param {object} params
 * @return {*}
 */
export const deleteUser = (params: { id: number }) => {
	return http.delete(PORT + `/system/user/delete`, params);
};

/**
 * @description: 修改状态
 * @param {Partial} params
 * @return {*}
 */
export const updateUserStatus = (params: Partial<UserModel.UserBean>) => {
	return http.put(PORT + `/system/user/update-status`, params);
};

/**
 * @description: 重置密码
 * @param {Partial} params
 * @return {*}
 */
export const updateUserPassword = (params: { id: number; password: string }) => {
	return http.put(PORT + `/system/user/update-password`, params);
};
