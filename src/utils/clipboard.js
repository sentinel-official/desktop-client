const copyToClipboard = (value) => {
    const copyText = document.createElement('input');
    copyText.setAttribute('value', value);
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
};

export default copyToClipboard;
