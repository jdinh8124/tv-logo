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
    let date = `${2020}-${'04'}-${'01'}`;
    console.log(date)
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

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

function searchShows(){
  event.preventDefault();
  if ($(".show-return").children().length > 0 ){
    $(".show-return").empty()
  }
  let search = $("#input-for-search").val();
  $("#input-for-search").val("")
  $.ajax({
    dataType: "json",
    url: `http://api.tvmaze.com/search/shows?q=${search}`,
    method: "GET",
    success: function (result) {
      if(result.length > 2){
      for(let i = 0; i < 3; i++){
        let mainDiv = $("<div>");
        let leftDiv = $("<div>");
        let altDescription = result[i].show.name;
        let image = result[i].show.image.medium;
        let img = $("<img>").attr("src", image).attr("alt", altDescription).addClass('show-pic-search')
        let name = $("<div>").text(`Name:`).addClass("bold")
        let nameText = $("<div>").text(altDescription);
        let nameDiv = $("<div>").append(name, nameText).addClass("searchMain")
        let network = $("<div>").text(`Network:`).addClass("bold")
        let networkText = $("<div>").text(result[i].show.network.name);
        let networkDiv = $("<div>").append(network, networkText).addClass("searchMain")
        let genres = $("<div>").text(`Genres:`).addClass("bold")
        let resultGenre;
        if (result[i].show.genres.length === 1 ){
          resultGenre = result[i].show.genres[0];
        }else{
          resultGenre = `${result[i].show.genres[0]}, ${result[i].show.genres[1]}`
        }
        let genresText = $("<div>").text(resultGenre);
        let genresDiv = $("<div>").append(genres, genresText).addClass("searchMain")
        let shortnedText = result[i].show.summary.split("</p>")[0];
        let truncated = truncateString(shortnedText, 450)
        let descriptionDiv = $("<div>").append(`<h4 class="no-margin">Summary:</h4> ${truncated}`);
        let rightDiv = $("<div>");
        leftDiv.addClass("leftSearch").append(img)
        rightDiv.addClass("rightSearch").append(nameDiv, networkDiv, genresDiv, descriptionDiv)
        mainDiv.addClass("show-search-div").append(leftDiv, rightDiv);
        $('.show-return').append(mainDiv).removeClass(".not-found")
      }
    }else{
        let mainDiv = $("<div>").append("<h2>Can not find shows you are searching!</h2>")
        $('.show-return').append(mainDiv).addClass("not-found")
    }
    }})
}
