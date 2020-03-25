$(document).ready(initalizeApp);

function initalizeApp() {
  getSchedule();
  $("#search-target").on("submit", searchShows)
}

function getSlick(){
  $('.slick-slider').slick({
    arrows: true,
    infinite: false,
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false
        }
      }
    ]
  });
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
        for(let i = 0; i < 24; i++){
          let image = result[i].show.image.medium;
          let altDescription = result[i].show.name;
          let picture = $("<img>").attr("src", image).attr("alt", altDescription).addClass('show-pic')
          let div = $("<div>").append(picture);
          $(".slick-slider").append(div)
      }
      getSlick();
    },
  });
}

function searchShows(){
  event.preventDefault();
  let search = $("#input-for-search").val();
  $("#input-for-search").val("")
  $.ajax({
    dataType: "json",
    url: `http://api.tvmaze.com/search/shows?q=${search}`,
    method: "GET",
    success: function (result) {
      console.log(result)
      let mainDiv = $("<div>");
      let leftDiv = $("<div>");
      let rightDiv = $("<div>");
    }})
}
