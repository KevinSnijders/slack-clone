// MEDIA QUERY MANAGER
const SMALL = 567;
const MEDIUM = 768;
const LARGE = 992;
const EXTRA_LARGE = 1200;

export function setMinWidthBreakpoint(breakpoint) {
	const type = 'min';
	return breakpointQueryManager(type, breakpoint);
}

export function setMaxWidthBreakpoint(breakpoint) {
	const type = 'max';
	return breakpointQueryManager(type, breakpoint);
}

function breakpointQueryManager(type, breakpoint) {
	const selectorQuery = `${type}-width`;
	let width;
	switch (breakpoint) {
		case 'sm':
			width = SMALL;
			break;
		case 'md':
			width = MEDIUM;
			break;

		case 'lg':
			width = LARGE;
			break;

		case 'xl':
			width = EXTRA_LARGE;
			break;

		default:
			break;
	}
	return `@media only screen and (${selectorQuery}: ${width}px)`;
}
