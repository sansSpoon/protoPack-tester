import '../_sass/style.scss';
import include from './include';

function component() {
	const element = document.createElement('div');

	element.innerHTML = ['Hello', 'World'].join(' ');
	element.classList.add('hello');

	return element;
}

document.body.appendChild(component());
document.body.appendChild(include());
