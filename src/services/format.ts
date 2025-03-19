export const formatTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds - hours * 3600) / 60);
	const time = `${minutes} minutes`;

	return hours ? `${hours} hours ${time}` : time;
};
