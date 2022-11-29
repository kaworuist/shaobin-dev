/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-10-28 10:17:27
 * @Description:修改密码弹框
 */

import { Form, Input, InputNumber, message, Modal } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { updateUserPassword, UserModel } from '@/api/modules/system_user';

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

const UpdatePassword = (props: IProps, ref: any) => {
	const { currentPage, getTableData } = props;
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	useImperativeHandle(ref, () => ({
		setModalFormDetail,
	}));

	const [modalTitle, setModalTitle] = useState('');
	// 回显数据
	const setModalFormDetail = async (record: Partial<UserModel.UserBean>) => {
		setModalVisible(true);
		setModalTitle(`重置密码`);
		form.setFieldsValue(record);
	};

	// 提交表单
	const onFinish = (values: any) => {
		const { id, password } = values;
		const ajaxjson = {
			id,
			password,
		};
		updateUserPassword(ajaxjson).then(() => {
			message.success('重置成功！');
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
				<Form.Item name="id" style={{ display: 'none' }}>
					<InputNumber />
				</Form.Item>
				<Form.Item name="username" label="用户名称">
					<Input placeholder="请输入" disabled />
				</Form.Item>
				<Form.Item name="nickname" label="用户昵称">
					<Input placeholder="请输入" disabled />
				</Form.Item>

				<Form.Item
					name="password"
					label="新密码"
					rules={[
						{
							required: true,
						},
						{
							type: 'string',
							min: 4,
							message: '最短4位!',
						},
						{
							type: 'string',
							max: 16,
							message: '最长16位!',
						},
					]}
				>
					<Input placeholder="请输入" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default forwardRef(UpdatePassword);
