import '../_sass/style.css';

function component() {
	const element = document.createElement('div');

	element.innerHTML = ['Hello', 'World'].join(' ');
	element.classList.add('hello');

	return element;
}

document.body.appendChild(component());
