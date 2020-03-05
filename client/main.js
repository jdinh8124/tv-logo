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
    let data =
    $.ajax({
      dataType: "json",
      url: `/schedule?country=:US&date=:${date}`,
      method: "GET",
      success: function (result) {
        $("#div1").html(result);
      },
    });
  }
