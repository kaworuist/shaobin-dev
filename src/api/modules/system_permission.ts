/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-10-28 09:32:04
 * @Description:权限管理相关
 */
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

export interface IAssignUserRoleReqParams {
	userId: number;
	roleIds: number[];
}

/**
 * @description: 获取用户角色id列表
 * @param {Partial} params
 * @return {*}
 */
export const getUserRoles = (params: { userId: number }) => {
	return http.get<number[]>(PORT + `/system/permission/list-user-roles`, params);
};

/**
 * @description: 分配角色
 * @param {Partial} params
 * @return {*}
 */
export const assignUserRole = (params: IAssignUserRoleReqParams) => {
	return http.post<boolean>(PORT + `/system/permission/assign-user-role`, params);
};
