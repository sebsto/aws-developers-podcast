document.addEventListener('DOMContentLoaded', () => {
  const playPauseButton = document.getElementById('play-pause');
  const progressSlider = document.getElementById('progress');
  const closeButton = document.getElementById('close');
  const playIcon = playPauseButton.querySelector('.cta__icon--play');
  const pauseIcon = playPauseButton.querySelector('.cta__icon--pause');
  const audioPlayer = document.getElementById('audio-player');
  const progressFill = document.querySelector('.progress-fill');
  const audioTitle = document.querySelector('.audio-player__title');
  const audioDetails = document.querySelector('.audio-player__details');

  let audio = null;
  let isPlaying = false;

  const createAudioElement = (src) => {
    if (audio) {
      audio.pause();
      audio.remove();
    }

    audio = document.createElement('audio');
    audio.src = src;
    audio.preload = 'auto';
    audioPlayer.appendChild(audio);

    audio.addEventListener('play', () => {
      isPlaying = true;
      playIcon.classList.add('d-none');
      pauseIcon.classList.remove('d-none');
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      playIcon.classList.remove('d-none');
      pauseIcon.classList.add('d-none');
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
        progressFill.style.width = `${progress}%`;
      }
    });

    progressSlider.addEventListener('input', (e) => {
      if (audio.duration) {
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
      }
    });

    audio.addEventListener('loadeddata', () => {
      console.log('Audio loaded:', audio.src);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      console.error('Audio source:', audio.src);
      audioPlayer.classList.remove('show');
    });
  };

  playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  closeButton.addEventListener('click', () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    audioPlayer.classList.remove('show');
  });

  function handlePlayEvent(element) {
    const audioSrc = element.getAttribute('data-audio-src');
    const title = element.getAttribute('data-title');
    const details = element.getAttribute('data-details');
    if (audioSrc) {
      console.log('Setting audio source to:', audioSrc);
      createAudioElement(audioSrc);
      audioTitle.textContent = title;
      audioDetails.textContent = details;
      audioPlayer.classList.add('show');
      playPauseButton.focus();
    } else {
      console.error('No audio source found for this button.');
    }
  }

  // Function to find the closest ancestor with the 'btn-play' class
  function findAncestorWithClass(element, className) {
    while (element && !element.classList.contains(className)) {
      console.log('element', element);
      element = element.parentElement;
    }
    return element;
  }

  // click listener for the featured section (loaded at page load)
  document.querySelector('.featured-episode').addEventListener('click', function (e) {
    console.log('CLICKED', e.target);

    // Find the closest ancestor with the 'btn-play' class
    const btnPlayElement = findAncestorWithClass(e.target, 'btn-play');

    if (btnPlayElement && btnPlayElement.closest('.featured-episode')) {
      console.log('Featured Episode button clicked : ', btnPlayElement);
      handlePlayEvent(btnPlayElement);
    }

    e.stopImmediatePropagation();

  });

  // click listener for sections that are loaded dynamically
  // move the click listner to the container, not to individual epiosde card to avoid multiple event listeners
  document.getElementById('episodes_cards').addEventListener('click', function (e) {
    console.log('CLICKED', e.target);

    // Find the closest ancestor with the 'btn-play' class
    const btnPlayElement = findAncestorWithClass(e.target, 'btn-play');

    if (btnPlayElement) {
      console.log('Dynamic Button clicked : ', btnPlayElement);
      handlePlayEvent(btnPlayElement);
    }

    e.stopImmediatePropagation();
  });
});
