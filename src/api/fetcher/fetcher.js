/**
 * Fetch plain text data
 * @param {string} url
 * @returns {string}
 */
export async function fetchPlain(url) {
	try {
		// fetch plain text data from url
		const response = await fetch(url);
		const data = await response.text();
		return data;
	} catch (err) {
		throw new Error("Failed to parse cron expression: " + toString(err));
	}
}
