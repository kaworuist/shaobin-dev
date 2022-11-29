import { PORT } from '@/api/config/servicePort';
// import qs from 'qs';
import http from '@/api';

export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		accessToken: string;
		userId: number;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

/**
 * @description: 用户登录
 * @param {Login} params
 * @return {*}
 */
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT + `/system/auth/login`, params);
	// return http.post<Login.ResLogin>(PORT + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

/* 
export const BatchAddRole = (params: FormData) => {
	return http.post(PORT + `/user/import`, params, { headers: { 'Content-Type': 'multipart/form-data' } });
};
export const exportRoleInfo = (params: RoleModel.ReqParams) => {
	return http.post<BlobPart>(PORT + `/user/export`, params, { responseType: 'blob' });
}; 
*/
