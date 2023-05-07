export default function handleFetch(fetchRes: ReturnType<typeof fetch>) {
	return fetchRes
		.then(async res => {
			if (!res.ok) {
				console.error(
					JSON.stringify({
						status: res.status,
						statusText: res.statusText,
						headers: res.headers,
						body: await res.json(),
					}),
				);
				throw new Error('Request failed');
			}
			return res;
		})
		.catch(e => {
			console.error(e);
			return null;
		});
}
