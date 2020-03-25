$(document).ready(initalizeApp);

function initalizeApp() {
  getSchedule();
}


  function getSchedule(){
    let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    if(month < 10){
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let year = currentDate.getFullYear()
    let date = `${year}-${month}-${25}`;
    $.ajax({
      dataType: "json",
      url: `http://api.tvmaze.com/schedule?country=US&date=${date}`,
      method: "GET",
      success: function (result) {
        for(let i = 0; i < 25; i++){
          let image = result[i].show.image.medium;
          let altDescription = result[i].show.name;
          let picture = $("<img>").attr("src", image).attr("alt", altDescription).addClass('show-pic')
          let div = $("<div>").append(picture);
          $(".slick-slider").append(div)
      }
        $('.slick-slider').slick({
          arrows: true,
          infinite: false,
          dots: false,
          slidesToShow: 6,
          slidesToScroll: 6,
          accessibility: true
        });
    },
  });
}
