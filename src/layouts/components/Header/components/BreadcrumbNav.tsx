import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux-ts/hook';

export default (props: any) => {
	const { pathname } = useLocation();
	const breadcrumbList = useAppSelector(state => state.breadcrumb.breadcrumbList) || []
	// const breadcrumbList = props.breadcrumbList[pathname] || [];

	return (
		<Breadcrumb>
			<Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
			{breadcrumbList.map((item: string) => {
				return <Breadcrumb.Item key={item}>{item !== '首页' ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

// const mapStateToProps = (state: any) => state.breadcrumb;
