/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-22 15:12:04
 * @Description:角色管理模块
 */
import { ResPage, ReqPage } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

// 角色模型
export namespace RoleModel {
	export interface RoleBean {
		code: string;
		createTime: number;
		creator: string;
		dataScope: number;
		dataScopeDeptIds: any;
		deleted: false;
		id: number;
		name: string;
		remark: string;
		sort: number;
		status: number;
		tenantId: number;
		type: number;
		updateTime: number;
		updater: string;
	}
	export interface ReqParams extends ReqPage, RoleBean {
		beginTime: string;
		endTime: string;
	}
}

/**
 * @description: 获取全部角色列表（无分页）
 * @param {Partial} params
 * @return {*}
 */
export const getRoleAllSimple = () => {
	return http.get<Array<RoleModel.RoleBean>>(PORT + `/system/role/list-all-simple`);
};

/**
 * @description: 获取角色列表
 * @param {Partial} params
 * @return {*}
 */
export const getRoleList = (params: Partial<RoleModel.ReqParams>) => {
	return http.get<ResPage<RoleModel.RoleBean>>(PORT + `/system/role/page`, params);
};

/**
 * @description: 获取角色详情
 * @param {Partial} params
 * @return {*}
 */
export const getRoleInfo = (params: Partial<RoleModel.RoleBean>) => {
	return http.get<RoleModel.RoleBean>(PORT + `/system/role/get`, params);
};

/**
 * @description: 导出角色
 * @param {Partial} params
 * @return {*}
 */
export const exportRole = (params: Partial<RoleModel.ReqParams>) => {
	return http.get<BlobPart>(PORT + `/system/role/export`, params, { responseType: 'blob' });
};

/**
 * @description: 新增角色
 * @param {Partial} params
 * @return {*}
 */
export const addRole = (params: Partial<RoleModel.RoleBean>) => {
	return http.post(PORT + `/system/role/create`, params);
};

/**
 * @description: 编辑角色
 * @param {Partial} params
 * @return {*}
 */
export const updateRole = (params: Partial<RoleModel.RoleBean>) => {
	return http.put(PORT + `/system/role/update`, params);
};

/**
 * @description: 删除角色
 * @param {object} params
 * @return {*}
 */
export const deleteRole = (params: { id: number }) => {
	return http.delete(PORT + `/system/role/delete`, params);
};

/**
 * @description: 修改状态
 * @param {Partial} params
 * @return {*}
 */
export const updateRoleStatus = (params: Partial<RoleModel.RoleBean>) => {
	return http.put(PORT + `/system/role/update-status`, params);
};
