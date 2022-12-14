// import ReactDOM from "react-dom";//v17
import ReactDOM from 'react-dom/client'; //v18
import '@/styles/reset.less';
import '@/assets/iconfont/iconfont.less';
import 'antd/dist/antd.less';
import '@/styles/common.less';
import '@/language/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { App } from '@/App';
import { store } from './redux-ts/store';

// react 17 创建，控制台会报错，暂时不影响使用（菜单折叠时不会出现闪烁）
// ReactDOM.render(
// 	// * react严格模式
// 	// <React.StrictMode>
// 	<Provider store={store}>
// 		<PersistGate persistor={persistor}>
// 			<App />
// 		</PersistGate>
// 	</Provider>,
// 	// </React.StrictMode>,
// 	document.getElementById("root")
// );

// import ReactDOM from "react-dom/client";
// react 18 创建（会导致 antd 菜单折叠时闪烁，等待官方修复）
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// * react严格模式
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
