export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// ex hello word => Hello Word
export const capitalizeEachWordInString = (str: string) =>
	str
		.split(' ')
		.map((word) => {
			if (word[0]) return word[0].toUpperCase() + word.substring(1);
			return '';
		})
		.join(' ');

export const decapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
export const showPercentages = (used: number, max: number) => Math.round((used / max) * 100);

export const milisecondsToMinutes = (miliseconds: number) => {
	const date = new Date(miliseconds);

	return `${date.getMinutes()}:${date.getSeconds()}`;
};

export const filterByTextHandler = (text: string, searchedText: string) =>
	text?.toLowerCase()?.indexOf(searchedText?.toLowerCase()) > -1;

export const sortByName = (first: string, second: string) => first?.localeCompare(second);

export const sortByDate = (first: string, second: string) => {
	const firstDate = new Date(first).getTime();
	const secondDate = new Date(second).getTime();

	return firstDate - secondDate;
};
