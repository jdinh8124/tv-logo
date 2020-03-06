$(document).ready(initalizeApp);

function initalizeApp() {
  getSchedule();
  $('.slick-slider').slick({
    arrows: true,
    infinite: false,
    dots:false,
    slidesToShow: 6,
    slidesToScroll: 6,
    accessibility: true
  });
}


  function getSchedule(){
    let date ="2020-03-05"
    $.ajax({
      dataType: "json",
      url: `http://api.tvmaze.com/schedule?country=US&date=${date}`,
      method: "GET",
      success: function (result) {
        for(let i = 0; i < 25; i++){
          let image = result[i].show.image.medium;
          let altDescription = result[i].show.name;
          let picture = $("<img>").attr("src", image).attr("alt", altDescription).addClass('show-pic')
          let divToAppendPic = `.show${i}`;
          $(divToAppendPic).append(picture);
       }
     },
   });
 }
