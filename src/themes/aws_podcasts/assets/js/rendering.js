function truncateText(text, n) {
    if (text.length <= n) {
        return text;
    }
    return text.substring(0, n) + '...';
}

function formatDuration(text) {
    const timeParts = text.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    let formattedDuration = '';
    if (hours > 0) {
        formattedDuration += `${hours} hr `;
    }
    if (minutes > 0) {
        formattedDuration += `${minutes} min `;
    }
    if (seconds > 0) {
        formattedDuration += `${seconds} secs`;
    }
    return formattedDuration.trim();
}

document.addEventListener('DOMContentLoaded', function() {

// Truncate text
const truncateElements = document.querySelectorAll('.truncate');
truncateElements.forEach(function(element) {
    const truncatedText = truncateText(element.textContent, 300); 
    element.textContent = truncatedText;
});

// Format duration
const durationElements = document.querySelectorAll('.duration');
durationElements.forEach(function(element) {
    const durationText = formatDuration(element.textContent);
    element.textContent = durationText;
});

});
