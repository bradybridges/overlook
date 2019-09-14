import $ from 'jquery';
import domUpdates from './domUpdates';
$('nav').click((e) => {
  if(e.target.dataset.toggle) {
    const toggleTarget = e.target.dataset.toggle;
    $(e.target).addClass('active-button');
    $(e.target).siblings().removeClass('active-button');
    $(toggleTarget).siblings().fadeOut(500);
    $(toggleTarget).fadeIn(500);
  } 
});


