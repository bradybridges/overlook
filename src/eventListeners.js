import $ from 'jquery';
$('nav').click((e) => {
  if(e.target.dataset.toggle) {
    const toggleTarget = e.target.dataset.toggle;
    $(toggleTarget).siblings().fadeOut(500);
    $(toggleTarget).fadeIn(500);
  } 
})