// Currently only support plain text (raw) response
// Example: https://dpaste.org/hwjat/raw

export async function fetch(url: string): Promise<string> {
	return await fetch(url)
		.then((response: any) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				return response.text() as Promise<string>;
			}
		})
		.catch((err) => {
			throw new Error(`Failed to fetch ${url}: ${err}`);
		});
}
