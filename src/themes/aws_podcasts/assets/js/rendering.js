function truncateText(text, n) {
if (text.length <= n) {
    return text;
}
return text.substring(0, n) + '...';
}

document.addEventListener('DOMContentLoaded', function() {
const truncateElements = document.querySelectorAll('.truncate');
truncateElements.forEach(function(element) {
    const truncatedText = truncateText(element.textContent, 300); // Change 100 to the desired number of characters
    element.textContent = truncatedText;
});
});
