import moment from 'moment';

const singleParse = obj => ({
	...obj,
	time: moment(obj).format('YYYY-MM-DD')
});

export default obj => {
	if (Array.isArray(obj)) {
		return obj.map(singleParse);
	} else {
		return singleParse(obj);
	}
}
