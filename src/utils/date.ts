import moment from 'moment';

export const formatDate2D = (timestamp: number) => {
	return moment(timestamp).format('YYYY-MM-DD');
};
export const formatDate2M = (timestamp: number) => {
	return moment(timestamp).format('YYYY-MM-DD HH:mm');
};
export const formatDate2S = (timestamp: number) => {
	return moment(timestamp).format('YYYY-MM-DD HH:mm:SS');
};
/**
 * @description: 起止日期拼接对应的起止时间后返回
 * @param {array} dateRange
 * @return {*}
 */
export const dateRange2Time = (dateRange: [moment.Moment, moment.Moment]) => {
	return [`${moment(dateRange[0]).format('YYYY-MM-DD')} 00:00:00`, `${moment(dateRange[1]).format('YYYY-MM-DD')} 23:59:59`];
};
