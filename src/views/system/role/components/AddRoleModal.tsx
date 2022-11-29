/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-23 18:27:58
 * @Description:
 */

import { Form, Input, InputNumber, message, Modal } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { addRole, updateRole, RoleModel } from '@/api/modules/system_role';
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

const AddRoleModal = (props: IProps, ref: any) => {
	const { currentPage, getTableData } = props;
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	useImperativeHandle(ref, () => ({
		setModalFormDetail,
	}));

	const [modalTitle, setModalTitle] = useState('');
	// 回显数据
	const setModalFormDetail = (record: RoleModel.RoleBean | number, title: string = '') => {
		setModalVisible(true);
		let tit = '修改';
		if (record === -1) tit = '新增';
		setModalTitle(`${tit}${title}`);
		form.setFieldsValue(record);
	};

	// 提交表单
	const onFinish = (values: any) => {
		const ajaxjson = {
			...values,
		};
		if (values.id > 0) {
			updateRole(ajaxjson).then(() => {
				message.success('修改成功！');
				handleCancel();
			});
		} else {
			addRole(ajaxjson).then(() => {
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

	return (
		<Modal title={modalTitle} centered visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
			<Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
				{/* 不展示，用于区分修改时带上id */}
				<Form.Item name="id" style={{ display: 'none' }}>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name="name"
					label="角色名称"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="请输入" />
				</Form.Item>

				<Form.Item
					name="code"
					label="角色标识"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="请输入" />
				</Form.Item>
				<Form.Item
					name="sort"
					label="角色顺序"
					rules={[
						{
							required: true,
						},
					]}
				>
					<InputNumber style={{ width: '100%' }} placeholder="请输入" />
				</Form.Item>
				<Form.Item name="remark" label="备注">
					<Input.TextArea showCount maxLength={200} placeholder="请输入" allowClear />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default forwardRef(AddRoleModal);
