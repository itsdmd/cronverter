/**
 * Fetch plain text data
 * @param {string} url
 * @returns {string}
 */
export async function fetchPlain(url) {
	try {
		// fetch plain text data from url
		const output = await fetch(url)
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				} else {
					const result = await response.text();
					return result;
				}
			})
			.catch((err) => {
				throw new Error(`Failed to fetch ${url}: ${err}`);
			});

		return output;
	} catch (err) {
		throw new Error("Failed to parse cron expression: " + toString(err));
	}
}
