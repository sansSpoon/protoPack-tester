import '../_sass/blue.scss';
import _ from 'lodash';

console.log(_.join(['Another', 'module', 'loaded!'], ' '),); // eslint-disable-line

export default function other() {
	const element = document.createElement('div');

	element.innerHTML = ['foo', 'bar'].join(' ');
	element.classList.add('taupe');

	return element;
}
