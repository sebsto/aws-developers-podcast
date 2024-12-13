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

  document.querySelectorAll('.btn-play').forEach(button => {
    button.addEventListener('click', (e) => {
      const audioSrc = e.currentTarget.getAttribute('data-audio-src');
      const title = e.currentTarget.getAttribute('data-title');
      const details = e.currentTarget.getAttribute('data-details');
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
    });
  });
});