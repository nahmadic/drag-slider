const slider = document.querySelector('.slider__content');
const sliderCards = Array.from(document.querySelectorAll('.slider__card'));
const sliderBar = document.querySelector('.slider__scroll-bar');
const sliderBarTrack = document.querySelector('.slider__scroll');
let isDown = false;
let startX, scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX)*3;
  slider.scrollLeft = scrollLeft - walk;
  sliderBar.style.left = (scrollLeft - walk) / scrollRatio + 'px';
});

// const slideTrackWidth = sliderCards.map(card => card.offsetWidth).reduce((total, width) => total + width);
const slideTrackWidth = slider.scrollWidth;
const slideContainerWidth = slider.clientWidth;
const slideBarTrackWidth = sliderBarTrack.offsetWidth;
const scrollRatio = slideTrackWidth / slideBarTrackWidth;
let barWidth;

console.table(slideTrackWidth, slideContainerWidth, slideBarTrackWidth);

function buildSlideBar(trackWidth, railWidth, containerWidth) {
  const widthRatio = trackWidth / containerWidth;
  barWidth = railWidth / widthRatio;

  sliderBar.style.width = barWidth + 'px';
}

buildSlideBar(slideTrackWidth, slideBarTrackWidth, slideContainerWidth);

sliderBar.addEventListener('mousedown', (e) => {
  isDown = true;
  // slider.classList.add('active');
  startX = e.pageX - sliderBar.offsetLeft;
  scrollLeft = sliderBar.offsetLeft;
});

sliderBar.addEventListener('mouseleave', () => {
  isDown = false;
  // sliderBar.classList.remove('active');
});

sliderBar.addEventListener('mouseup', () => {
  isDown = false;
  // slider.classList.remove('active');
});

sliderBar.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - sliderBar.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = (scrollLeft + walk) * scrollRatio;
  barStart = sliderBar.offsetLeft;
  barEnd = sliderBar.offsetLeft + barWidth;
  console.log({barStart, barEnd});
  if(barStart >= 0 && barEnd <= slideBarTrackWidth) {
    sliderBar.style.left = scrollLeft + walk + 'px';
  } else {

    // sliderBar.style.left == '0px';
  }
});