/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-10-28 09:17:54
 * @Description:分配角色弹框
 */

import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { UserModel } from '@/api/modules/system_user';
import { getRoleAllSimple, RoleModel } from '@/api/modules/system_role';
import { assignUserRole, IAssignUserRoleReqParams } from '@/api/modules/system_permission';

const { Option } = Select;

const formItemLayout = {
	labelCol: {
		sm: {
			span: 6,
		},
	},
	wrapperCol: {
		sm: {
			span: 16,
		},
	},
};

interface IProps {
	currentPage: number;
	getTableData: Function;
}

const AssignRoleModal = (props: IProps, ref: any) => {
	const { currentPage, getTableData } = props;
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	useImperativeHandle(ref, () => ({
		setModalFormDetail,
	}));

	const [modalTitle, setModalTitle] = useState('');
	const [roles, setRoles] = useState<RoleModel.RoleBean[]>([]);
	// 回显数据
	const setModalFormDetail = async (record: Partial<UserModel.UserBean>) => {
		setModalVisible(true);
		setModalTitle(`分配角色`);
		const { data } = await getRoleAllSimple();
		if (data) setRoles(data);
		form.setFieldsValue(record);
	};

	// 提交表单
	const onFinish = (values: any) => {
		const { userId, roleIds } = values;
		const ajaxjson: IAssignUserRoleReqParams = {
			userId,
			roleIds,
		};
		assignUserRole(ajaxjson).then(() => {
			message.success('分配成功！');
			handleCancel();
		});
	};

	// 弹框提交
	const handleOk = () => {
		form.submit();
	};

	// 弹框取消
	const handleCancel = () => {
		form.resetFields();
		setModalVisible(false);
		getTableData(currentPage);
	};

	return (
		<Modal width={800} title={modalTitle} centered visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
				{/* 不展示，用于区分修改时带上id */}
				<Form.Item name="userId" style={{ display: 'none' }}>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name="username"
					label="用户名称"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="请输入" disabled />
				</Form.Item>
				<Form.Item
					name="nickname"
					label="用户昵称"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="请输入" disabled />
				</Form.Item>

				<Form.Item name="roleIds" label="角色">
					<Select placeholder="请选择" allowClear mode="multiple">
						{roles?.map((item, index) => (
							<Option value={item.id} key={index}>
								{item.name}
							</Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default forwardRef(AssignRoleModal);
