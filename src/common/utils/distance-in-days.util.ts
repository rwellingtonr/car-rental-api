const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const distanceInDays = (startDateString: string, endDateString: string) => {
	const startDate = new Date(startDateString).getTime();
	const endDate = new Date(endDateString).getTime();
	const diffTime = Math.abs(endDate - startDate);
	const diffDays = Math.ceil(diffTime / ONE_DAY_IN_MILLISECONDS);
	return diffDays;
};
