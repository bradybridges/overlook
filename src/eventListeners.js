import $ from 'jquery';
$('nav').click((e) => {
  if(e.target.dataset.toggle) {
    const toggleTarget = e.target.dataset.toggle;
    $(e.target).addClass('active-button');
    $(e.target).siblings().removeClass('active-button');
    $(toggleTarget).siblings().fadeOut(500);
    $(toggleTarget).fadeIn(500);
  } 
});

$('#customer-search-input').keyup((e) => {
  const searchValue = $(e.target).val();
  
  if(searchValue !== '') {
    $('#search-results').removeClass('display-none');
  } else {
    $('#search-results').addClass('display-none');
  }
})