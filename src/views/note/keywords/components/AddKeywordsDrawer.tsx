/*
 * @Author: qinhanci 1584225429@qq.com
 * @Date: 2022-10-26 15:08:51
 * @Description:
 */
import { addNoteKeywords, KeywordsModel, updateNoteKeywords } from '@/api/modules/note_keywords';
import { Button, Drawer, Form, Input, InputNumber, message, Select } from 'antd';
import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../keywords.less';
import { getUserAllSimple, UserModel } from '@/api/modules/system_user';

interface IProps {
	currentPage: number;
	getTableData: Function;
}

const { Option } = Select;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 },
	},
};
const formItemLayoutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 20, offset: 4 },
	},
};

const AddKeywordsDrawer = (props: IProps, ref: any) => {
	const { getTableData } = props;
	const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
	const [form] = Form.useForm();

	useImperativeHandle(ref, () => ({
		setDrawerFormDetail,
	}));

	const [drawerTitle, setDrawerTitle] = useState('');

	// 回显数据
	const setDrawerFormDetail = (record: KeywordsModel.KeywordsBean | number, title: string = '') => {
		setDrawerVisible(true);
		let tit = '修改';
		if (record === -1) {
			tit = '新增';
		}

		setDrawerTitle(`${tit}${title}`);
		form.setFieldsValue(record);
		if (record instanceof Object) {
			if (typeof record.informMethods === 'object') {
				form.setFieldsValue({ informMethods: Number(record.informMethods.join(',')) });
			}
			const newLabel: number[] = [];
			record.informObjects.map((item: { name: string; id: any }) => {
				// newLabel.push({ children: item.name, key: item.id, label: item.name, value: item.id });
				newLabel.push(item.id);
			});
			form.setFieldsValue({ informObjects: newLabel });
		}
	};

	// 全部用户列表
	const [users, setUsers] = useState<UserModel.UserBean[]>([]);
	const getUserList = async () => {
		const { data } = await getUserAllSimple();
		if (data) setUsers(data);
	};

	useEffect(() => {
		getUserList();
	}, []);

	// 提交表单
	const onFinish = (values: any) => {
		const ajaxjson = {
			...values,
		};
		const newObjects: { id: string }[] = [];
		values.informObjects.map((item: string) => {
			newObjects.push({ id: item });
		});
		ajaxjson.informObjects = newObjects;

		if (values.id > 0) {
			updateNoteKeywords(ajaxjson).then(() => {
				message.success('修改成功！');
				handleCancel();
				getTableData();
			});
		} else {
			addNoteKeywords(ajaxjson).then(() => {
				message.success('新增成功！');
				handleCancel();
				getTableData();
			});
		}
	};

	// 弹框取消
	const handleCancel = () => {
		form.resetFields();
		setDrawerVisible(false);
		// getTableData(currentPage);
	};
	return (
		<Drawer
			className="drawer_con"
			title={drawerTitle}
			placement="right"
			width={576}
			visible={drawerVisible}
			onClose={handleCancel}
		>
			<Form form={form} name="register" onFinish={onFinish} {...formItemLayout} scrollToFirstError>
				{/* 不展示，用于区分修改时带上id */}
				<Form.Item name="id" style={{ display: 'none' }}>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name="type"
					label="短信类型"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="请输入" />
				</Form.Item>

				<Form.List
					name="keywords"
					initialValue={['']}
					rules={[
						{
							validator: async (_, keywords) => {
								if (!keywords || keywords.length < 1) {
									return Promise.reject(new Error('请填入至少一个关键字'));
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									{...(index === 0 ? formItemLayoutLabel : formItemLayoutWithOutLabel)}
									// wrapperCol={{ span: 24 }}
									label={index === 0 ? '关键字' : ''}
									required={true}
									key={field.key}
								>
									<Form.Item
										{...field}
										validateTrigger={['onChange', 'onBlur']}
										rules={[
											{
												required: true,
												whitespace: true,
												message: '请输入关键字',
											},
										]}
										noStyle
									>
										<Input placeholder="请输入" style={{ width: '60%' }} />
									</Form.Item>
									{fields.length > 1 ? (
										<MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
									) : null}
								</Form.Item>
							))}
							<Form.Item {...formItemLayoutWithOutLabel}>
								<Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
									添加关键字
								</Button>
								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item
					name="informMethods"
					label="通知方式"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Select placeholder="请选择" allowClear>
						<Option value={1} key={1}>
							短信通知
						</Option>
						<Option value={2} key={2}>
							短信通知与电话通知
						</Option>
					</Select>
				</Form.Item>
				<div className="inform_object">
					<Form.Item
						name="informObjects"
						label="通知对象"
						wrapperCol={{ span: 24 }}
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select placeholder="请选择" mode="multiple" allowClear>
							{users.map(item => (
								<Option key={item.id} value={item.id} label={item.nickname}>
									{item.nickname}
								</Option>
							))}
						</Select>
					</Form.Item>
				</div>
				<div className="btn">
					<Form.Item wrapperCol={{ offset: 0, span: 24 }}>
						<Button onClick={handleCancel}>取消</Button>
						<Button type="primary" htmlType="submit">
							保存
						</Button>
					</Form.Item>
				</div>
			</Form>
		</Drawer>
	);
};

export default forwardRef(AddKeywordsDrawer);
