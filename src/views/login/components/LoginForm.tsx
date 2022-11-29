// import md5 from 'js-md5';
import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Login } from '@/api/interface';
import { loginApi } from '@/api/modules/login';
import { HOME_URL } from '@/config/config';
import { connect } from 'react-redux';
import { setToken, setUserInfo } from '@/redux/modules/global/action';
import { setTabsList } from '@/redux/modules/tabs/action';
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons';

const LoginForm = (props: any) => {
	const { setToken, setUserInfo, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			// loginForm.password = md5(loginForm.password);
			const { data } = await loginApi(loginForm);
			setToken(data?.accessToken);
			setUserInfo({ userId: data?.userId, username: loginForm.username });
			setTabsList([]);
			message.success('登录成功！');
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true, username: 'admin', password: 'admin123' }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="请输入用户名" prefix={<UserOutlined />} allowClear />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input.Password autoComplete="new-password" placeholder="请输入密码" prefix={<LockOutlined />} allowClear />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					重置
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setUserInfo, setTabsList };
export default connect(null, mapDispatchToProps)(LoginForm);
