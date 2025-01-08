export const setItem = (key: string, val: any) => {
	localStorage.setItem(key, JSON.stringify(val));
};

export const getItem = (key: string) => {
	let item = localStorage.getItem(key);
	if (item?.startsWith('{') || item?.startsWith('"') || item?.startsWith('[')) {
		return JSON.parse(item);
	} else {
		return item;
	}
};

export const removeItem = (key: string) => {
	localStorage.removeItem(key);
};

export const clearAllItem = (item: string = '') => {
	if (!item) {
		localStorage.clear();
		return;
	}
	for (let i = localStorage.length - 1; i >= 0; i--) {
		let key = localStorage.key(i);
		console.log('i', i, key, localStorage.length);
		if(key && key !== item) {
			localStorage.removeItem(key);
		}
	}
};

export const downloadBlob = (data: any) => {
	let contentDisposition = data.headers['content-disposition'];
	var index = contentDisposition.indexOf('e=');
	const fileName =
		contentDisposition.slice(index + 3, contentDisposition.length - 1) ||
		new Date().getTime() + '.csv';
	download(fileName, data.data);
};

export const download = (fileName: string, blob: Blob) => {
	const link = document.createElement('a');
	const newBlob = new Blob([blob]);
	link.href = URL.createObjectURL(newBlob);
	link.download = fileName;
	link.click();
	link.remove();
	URL.revokeObjectURL(link.href);
};

