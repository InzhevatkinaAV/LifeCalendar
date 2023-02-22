export function showAwareFor(inputElement) {
    inputElement.style.borderColor = '#ff0000';
    inputElement.style.background = '#ffe5e5';
    setTimeout(() => { inputElement.style.borderColor = '#bdbdbd'; inputElement.style.background = '#ffffff'; }, 1000);
}
