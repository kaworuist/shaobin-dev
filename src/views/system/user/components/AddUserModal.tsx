/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-23 18:27:58
 * @Description:添加/修改用户
 */

import { Cascader, Form, Input, InputNumber, message, Modal, Radio } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { addUser, updateUser, UserModel } from '@/api/modules/system_user';

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
	deptList: Array<any>; // 用户下拉框数据
	currentPage: number;
	getTableData: Function;
}

const AddUserModal = (props: IProps, ref: any) => {
	const { currentPage, getTableData, deptList } = props;
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	useImperativeHandle(ref, () => ({
		setModalFormDetail,
	}));

	const [modalTitle, setModalTitle] = useState('');
	// 回显数据
	const setModalFormDetail = (record: Partial<UserModel.UserBean> | number, title: string = '') => {
		setModalVisible(true);
		let tit = '';
		if (record === -1) {
			record = { status: 0 };
		}
		if (typeof record === 'object' && record?.id) {
			tit = '修改';
		} else {
			tit = '新增';
		}
		setModalTitle(`${tit}${title}`);
		form.setFieldsValue(record);
	};

	// 提交表单
	const onFinish = (values: any) => {
		const { id, deptIds, ...rest } = values;
		const ajaxjson = {
			postIds: [], //部门，后端校验[]
			...rest,
		};
		if (deptIds && deptIds.length > 0) {
			ajaxjson.deptId = deptIds[deptIds.length - 1];
		}
		if (id > 0) {
			ajaxjson.id = id;
			updateUser(ajaxjson).then(() => {
				message.success('修改成功！');
				handleCancel();
			});
		} else {
			addUser(ajaxjson).then(() => {
				message.success('新增成功！');
				handleCancel();
			});
		}
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

	const CascaderFilter = (inputValue: string, path: DefaultOptionType[]) =>
		path.some(option => (option.name as string).indexOf(inputValue) > -1);

	return (
		<Modal width={800} title={modalTitle} centered visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
				{/* 不展示，用于区分修改时带上id */}
				<Form.Item name="id" style={{ display: 'none' }}>
					<InputNumber />
				</Form.Item>
				<Form.Item name="username" style={{ display: 'none' }}>
					<Input />
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
					<Input placeholder="请输入" />
				</Form.Item>

				<Form.Item name="deptIds" label="归属部门">
					<Cascader
						showSearch={{ filter: CascaderFilter }}
						fieldNames={{ label: 'name', value: 'id' }}
						options={deptList}
						placeholder="请选择"
					/>
				</Form.Item>

				<Form.Item
					name="mobile"
					label="手机号码"
					rules={[
						{
							pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
							message: '请输入正确的手机号码',
						},
					]}
				>
					<Input placeholder="请输入" />
				</Form.Item>
				<Form.Item
					name="email"
					label="邮箱"
					rules={[
						{
							type: 'email',
							message: '请输入正确的邮箱',
						},
					]}
				>
					<Input placeholder="请输入" />
				</Form.Item>

				<Form.Item
					name="sex"
					label="性别"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Radio.Group>
						<Radio value={1}>男</Radio>
						<Radio value={2}>女</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default forwardRef(AddUserModal);
