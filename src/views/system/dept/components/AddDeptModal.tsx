/*
 * @Author: husheng 1069768616@qq.com
 * @Date: 2022-08-23 18:27:58
 * @Description:添加/修改部门
 */

import { Cascader, Form, Input, InputNumber, message, Modal, Radio, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { addDept, updateDept, DeptModel } from '@/api/modules/system_dept';
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
	deptList: Array<any>; // 部门下拉框数据
	users: Array<any>; // 负责人下拉框数据
	currentPage: number;
	getTableData: Function;
}

const AddDeptModal = (props: IProps, ref: any) => {
	const { currentPage, getTableData, deptList, users } = props;
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	useImperativeHandle(ref, () => ({
		setModalFormDetail,
	}));

	const [modalTitle, setModalTitle] = useState('');
	// 回显数据
	const setModalFormDetail = (record: Partial<DeptModel.DeptBean> | number, title: string = '') => {
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
		console.log('values: ', values);
		const { id, parentIds, ...rest } = values;
		const ajaxjson = {
			...rest,
		};
		if (parentIds && parentIds.length > 0) {
			ajaxjson.parentId = parentIds[parentIds.length - 1];
		}
		if (id > 0) {
			ajaxjson.id = id;
			updateDept(ajaxjson).then(() => {
				message.success('修改成功！');
				handleCancel();
			});
		} else {
			addDept(ajaxjson).then(() => {
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
				<Form.Item name="parentIds" label="上级部门">
					<Cascader
						showSearch={{ filter: CascaderFilter }}
						fieldNames={{ label: 'name', value: 'id' }}
						options={deptList}
						placeholder="请选择"
					/>
				</Form.Item>

				<Form.Item
					name="name"
					label="部门名称"
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
					label="显示排序"
					rules={[
						{
							required: true,
						},
					]}
				>
					<InputNumber style={{ width: '100%' }} placeholder="请输入" />
				</Form.Item>
				<Form.Item name="leaderUserId" label="负责人">
					<Select
						allowClear
						showSearch
						optionFilterProp="label"
						style={{
							width: '100%',
						}}
						placeholder="请选择"
					>
						{users.map(item => (
							<Option key={item.id} value={item.id} label={item.nickname}>
								{item.nickname}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					name="phone"
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
					name="status"
					label="部门状态"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Radio.Group>
						<Radio value={0}>开启</Radio>
						<Radio value={1}>关闭</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default forwardRef(AddDeptModal);
