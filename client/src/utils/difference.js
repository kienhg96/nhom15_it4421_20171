export default (obj1, obj2) => {
	const keys = Object.keys(obj1);
	const result = {};
	keys.forEach(key => {
		if (obj1[key] !== obj2[key]) {
			console.log(key);
			result[key] = obj1[key];
		}
	});
	return result;
}
