$(document).ready(initalizeApp);

function initalizeApp() {
  $('.slick-slider').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6
  });
  getSchedule();
}



  function getSchedule(){
    let date ="2020-03-05"
    $.ajax({
      dataType: "json",
      url: `http://api.tvmaze.com/schedule?country=US&date=${date}`,
      method: "GET",
      success: function (result) {
        console.log(result)
      },
    });
  }
