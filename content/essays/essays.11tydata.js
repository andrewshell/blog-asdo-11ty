export default {
	tags: [
		"essays"
	],
	"layout": "layouts/essay.njk",
	"permalink": "/essays/{{ page.fileSlug | removeDate }}/",
};
