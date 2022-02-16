// Ensure all images have alt tags
$(() => {
	setTimeout(() => {
		$("img").each((i, elem) => {
			if(elem.alt === "") {
				console.warn("<img> tag doesn't have alt text!", elem);
			}
		})
	}, 1000);
});