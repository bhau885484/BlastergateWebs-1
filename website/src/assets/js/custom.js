
               
  function showTemplates() {
   document.getElementById('temp').style.display = "block";
}




         $('.responsive').slick({
         dots: false,
         autoplay: true,
         infinite: true,
         speed: 300,
         slidesToShow:3,
         slidesToScroll: 3,
         responsive: [
           {
             breakpoint: 1024,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               infinite: true,
               dots: false
             }
           },
           {
             breakpoint: 600,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 2
             }
           },
           {
             breakpoint: 480,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           }
           // You can unslick at a given breakpoint now by adding:
           // settings: "unslick"
           // instead of a settings object
         ]
         });
   