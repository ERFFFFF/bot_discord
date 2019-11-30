// Delay, sleep, wait function.
exports.delay = (timeout) =>
{
	return new Promise((resolve) => {
	  setTimeout(resolve, timeout);
	});
}