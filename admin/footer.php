<div class="main-footer text-center">
   <div class="container">
      <div class="row row-sm">
         <div class="col-md-12">
            <!-- <span>Copyright © 2023 <a href="#">Spruha</a>. Designed by <a href="https://www.spruko.com/">Spruko</a> All rights reserved.</span> -->
         </div>
      </div>
   </div>
</div>
</div>
<a href="#top" id="back-to-top"><i class="fe fe-arrow-up"></i></a>
<!-- JQUERY JS -->
<script src="<?php echo $base_url ?>/assets/plugins/jquery/jquery.min.js"></script>
<!-- BOOTSTRAP JS -->
<script src="<?php echo $base_url ?>/assets/plugins/bootstrap/js/popper.min.js"></script>
<script src="<?php echo $base_url ?>/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- PERFECT SCROLLBAR JS -->
<!-- <script src="<?php echo $base_url ?>/assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script> -->
<!-- SIDEMENU JS -->
<script src="<?php echo $base_url ?>/assets/plugins/sidemenu/sidemenu.js" id="leftmenu"></script>
<!-- SIDEBAR JS -->
<!-- <script src="<?php echo $base_url ?>/assets/plugins/sidebar/sidebar.js"></script> -->
<!-- SELECT2 JS -->
<!-- <script src="<?php echo $base_url ?>/assets/plugins/select2/js/select2.min.js"></script>
<script src="<?php echo $base_url ?>/assets/js/select2.js"></script> -->
<!-- Internal Chart.Bundle js-->
<script src="<?php echo $base_url ?>/assets/plugins/chart.js/Chart.bundle.min.js"></script>
<!-- Peity js-->
<script src="<?php echo $base_url ?>/assets/plugins/peity/jquery.peity.min.js"></script>
<!-- Internal Morris js -->
<script src="<?php echo $base_url ?>/assets/plugins/raphael/raphael.min.js"></script>
<script src="<?php echo $base_url ?>/assets/plugins/morris.js/morris.min.js"></script>
<!-- Circle Progress js-->
<script src="<?php echo $base_url ?>/assets/plugins/circle-progress/circle-progress.min.js"></script>
<script src="<?php echo $base_url ?>/assets/js/chart-circle.js"></script>
<!-- Internal Dashboard js-->
<script src="<?php echo $base_url ?>/assets/js/index.js"></script>
<!-- STICKY JS -->
<script src="<?php echo $base_url ?>/assets/js/sticky.js"></script>
<!-- COLOR THEME JS -->
<script src="<?php echo $base_url ?>/assets/js/themeColors.js"></script>
<!-- CUSTOM JS -->
<script src="<?php echo $base_url ?>/assets/js/custom.js"></script>
<!-- SWITCHER JS -->
<script src="<?php echo $base_url ?>/assets/switcher/js/switcher.js"></script>
<!-- <script src="https://cdn.ckeditor.com/4.14.0/full/ckeditor.js"></script> -->

<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyDTYoTj_UeBdzy9d3_-kNngDpwqQIzKDJk&libraries=places" async defer></script>

<script src="https://cdn.ckeditor.com/4.22.1/full/ckeditor.js"></script>


<script type ="text/javascript" src="<?php echo $base_url ?>/assets/js/multiple-select.js"></script>
<link href="<?php echo $base_url ?>/assets/css/multiple-select.css" rel="stylesheet"/>



<script type="text/javascript">
   function  showHideMenu () {
   	if($('#side_menu').hasClass('show-main-sidebar')){
   		$('#side_menu').removeClass('show-main-sidebar')
   	}else{
   		$('#side_menu').addClass('show-main-sidebar');
   	}
   	
   }
</script>
<script>
   $(function() {
     $('input[name="daterange"]').daterangepicker({
       opens: 'right',    
       locale: {
         format: 'DD/MM/YYYY'
       }
     }, function(start, end, label) {
       console.log("A new date selection was made: " + start.format('DD-MM-YYYY') + ' to ' + end.format('DD-MM-YYYY'));
     });
   });
</script>
<script>
  $(document).ready(function() {
  // alert();
    CKEDITOR.replace('benefits', {
    height:200,
    uiColor: '#CCEAEE',
    contentsCss: [
        'http://cdn.ckeditor.com/4.23.0-lts/full-all/contents.css',
        'https://ckeditor.com/docs/ckeditor4/4.23.0-lts/examples/assets/css/classic.css'
      ],
     
        
        filebrowserUploadMethod: 'form'
    });

    CKEDITOR.editorConfig = function( config ) {
   config.toolbar = [
    [ 'SpecialChar', 'Bold', 'Italic', 'Strike', 'Underline',{ name: 'colors', items: [ 'TextColor', 'BGColor' ] }]
    ];

    config.removePlugins = 'elementspath';
    config.resize_enabled = false;

    config.extraPlugins = 'colordialog';
  };


   CKEDITOR.replace('about_item', {
    height:200,
    uiColor: '#CCEAEE',
    contentsCss: [
        'http://cdn.ckeditor.com/4.23.0-lts/full-all/contents.css',
        'https://ckeditor.com/docs/ckeditor4/4.23.0-lts/examples/assets/css/classic.css'
      ],
     
        
        filebrowserUploadMethod: 'form'
    });

    CKEDITOR.editorConfig = function( config ) {
   config.toolbar = [
    [ 'SpecialChar', 'Bold', 'Italic', 'Strike', 'Underline',{ name: 'colors', items: [ 'TextColor', 'BGColor' ] }]
    ];

    config.removePlugins = 'elementspath';
    config.resize_enabled = false;

    config.extraPlugins = 'colordialog';
  };

});
</script>
<!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script> -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

<script type="text/javascript">
  $('.nav-item').on('click', function (event) {
    $('.nav-item').removeClass('active');
    $('.nav-item').removeClass('show');
    $(this).addClass('active');
    $(this).addClass('show');
  });
</script>
</body>
</html>