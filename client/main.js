$(document).ready(initalizeApp);

function initalizeApp() {
  $('.your-class').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6
  });
  getSchedule();
}



  function getSchedule(){
    $.ajax({
      dataType: "json",
      url: "/schedule?country=:countrycode&date=:date",
      method: "GET",
      success: function (result) {
        $("#div1").html(result);
      },
    });
  }
