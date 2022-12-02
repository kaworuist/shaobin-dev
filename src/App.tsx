import { useState, useEffect } from 'react';
import { getBrowserLang } from '@/utils/util';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from '@/routers/utils/authRouter';
import Router from '@/routers/index';
import useTheme from '@/hooks/useTheme';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import i18n from 'i18next';
import 'moment/dist/locale/zh-cn';
import { useAppDispatch, useAppSelector } from './redux-ts/hook';
import { setLanguage } from './redux-ts/global.slice';

export const App = () => {
	// const { language, assemblySize, themeConfig, setLanguage } = props;
	const global = useAppSelector(state => state.global)
	const { language, assemblySize, themeConfig } = global;
	const { weakOrGray } = themeConfig;
	const dispatch = useAppDispatch()
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	// 全局使用主题
	useTheme(weakOrGray);
	// useTheme('weak');

	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == 'zh') return setI18nLocale(zhCN);
		if (language && language == 'en') return setI18nLocale(enUS);
		if (getBrowserLang() == 'zh') return setI18nLocale(zhCN);
		if (getBrowserLang() == 'en') return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		dispatch(setLanguage(language || getBrowserLang()));
		setAntdLanguage();
	}, [language]);

	return (
		<BrowserRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</BrowserRouter>
	);
};
