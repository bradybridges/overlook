import $ from 'jquery';
$('nav').click((e) => {
  if(e.target.dataset.toggle) {
    const toggleTarget = e.target.dataset.toggle;
    $(toggleTarget).siblings().addClass('display-none');
    $(toggleTarget).toggleClass('display-none');
  } 
})