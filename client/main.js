$(document).ready(initalizeApp);

function initalizeApp() {
  $('.slick-slider').slick({
    infinite: true,
    arrows: true,
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
        for(let i = 0; i < 26; i++){
          let image = result[i].show.image.medium;
          let altDescription = result[i].show.name;
           let picture = $("<img>").attr("src", image).attr("alt", altDescription)
          $('.slick-slider').append(picture);
       }
     },
   });
 }
