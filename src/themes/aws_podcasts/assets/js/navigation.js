let currentPage = 1;

function loadPage(page) {
		fetch(`episodes/pages/${page}/index.html`)
				.then(response => response.text())
				.then(data => {
					let element = document.getElementById('episodes_cards');
					let existing = element.innerHTML
					element.innerHTML = existing + data;
				})
				.catch(error => {
						console.error('Error loading page:', error);
				});
}

function createObserver() {
	let options = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0
	};

	let observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(document.querySelector('#scrollAnchor'));
}

/* 
  maxPages is defined and initialized in templates/partial/home/episodes.mustache
*/
function handleIntersect(entries, observer) {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					if (currentPage < maxPages) {
						currentPage++;
						console.log("loading page: " + currentPage);
						loadPage(currentPage);
					} else {
						console.log("No more pages to load");
					}
			}
	});
}

// Load the first page initially
loadPage(currentPage);

// Create the observer for infinite scrolling
createObserver();