import '../_sass/blue.scss';

export default function other() {
	const element = document.createElement('div');

	element.innerHTML = ['foo', 'bar'].join(' ');
	element.classList.add('taupe');

	return element;
}
