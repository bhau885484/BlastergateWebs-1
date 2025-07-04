<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Add Voucher Code </h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Add Promo Code</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                  <form  id="add_form" name="add_form" class="form-horizontal" method="post" action="save.php" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Promo Code Title <span class="error_msg">*</span></label>
                          <input type="text" class="form-control" placeholder="Promo Code Title " name="promo_code" id="promo_code" aria-label="name" aria-describedby="basic-addon1">
                          <div class="error_msg" id="promo_code_error"></div>
                       </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Promo Type <span class="error_msg">*</span></label>
                             <select class="form-select" aria-label="Default select example" name="promo_type" id="promo_type">
                              <option selected value="">Select Type</option>
                              <!-- <option value="1">Percentage</option> -->
                              <option value="2" selected="selected">Fixed Amount</option>
                           </select>
                            <div class="error_msg" id="promo_type_error"></div>
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <div class="form-group mb-3">
                             <label id="basic-addon1">Discount Value  <span class="error_msg">*</span></label>
                             <input type="number" class="form-control" name="promo_price" id="promo_price" placeholder="Discount Value">
                              <div class="error_msg" id="promo_price_error"></div>
                         </div>
                      </div>
                    </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">User Limit  <span class="error_msg">*</span></label>
                           <input type="text" class="form-control" name="user_limit" id="user_limit" placeholder="1-100 User">
                            <div class="error_msg" id="user_limit_error"></div>
                         </div>
                      </div>
                     
                    
                     
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Promo Code From Date  <span class="error_msg">*</span></label>
                           <input class="form-control" type="date" name="start_date" id="start_date">
                           <div class="error_msg" id="start_date_error"></div>
                       </div>
                     </div>
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Promo Code To Date  <span class="error_msg">*</span></label>
                           <input class="form-control" type="date" name="end_date" id="end_date">
                           <div class="error_msg" id="end_date_error"></div>
                       </div>
                     </div>
                     <div class="col-md-12">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Description</label>
                           <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                          
                       </div>
                     </div>
                     
                    
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()">Add</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<?php include "../footer.php";  ?>
<script type="text/javascript">
  $( document ).ready(function() {
      initMap();

      CKEDITOR.replace('event_description', {
      height:200,
      uiColor: '#CCEAEE',
      contentsCss: [
          'http://cdn.ckeditor.com/4.23.0-lts/full-all/contents.css',
          'https://ckeditor.com/docs/ckeditor4/4.23.0-lts/examples/assets/css/classic.css'
        ],
       
          
          filebrowserUploadMethod: 'form'
      });


  });
   function initMap()
    {
       var input = document.getElementById("location");
      
        var autocomplete = new google.maps.places.Autocomplete(input);
        var autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          console.log(place);
            
           var lat = place.geometry.location.lat();
           var lng = place.geometry.location.lng();

           var city_name = place.name;
           var place_id = place.place_id;
           var map_url = place.url;
           var formatted_address = place.formatted_address;
            
            $('#lat').val(lat);
            $('#lng').val(lng);
            $('#city_name').val(city_name);
            $('#place_id').val(place_id);
            $('#map_url').val(map_url);
            $('#formatted_address').val(formatted_address);
            // $('#submit_button').prop('disabled', false);
        });
    }

     function submitDetailsForm() {

      var error = 1;
      var promo_code = $("#promo_code").val();
      var promo_type = $("#promo_type").val();
      var promo_price = $("#promo_price").val();
      var user_limit = $("#user_limit").val();
      var start_date = $("#start_date").val();
      var end_date = $("#end_date").val();
      
      if((promo_code == '') || (promo_code == undefined)){
        $("#promo_code_error").text("This field are required");
        error = 0;
      }else{
        $("#promo_code_error").text("");
      }

      if((promo_type == '') || (promo_type == undefined)){
        $("#promo_type_error").text("This field are required");
        error = 0;
      }else{
        $("#promo_type_error").text("");
      }

      if((promo_price == '') || (promo_price == undefined)){
        $("#promo_price_error").text("This field are required");
        error = 0;
      }else{
        $("#promo_price_error").text("");
      }

      if((user_limit == '') || (user_limit == undefined)){
        $("#user_limit_error").text("This field are required");
        error = 0;
      }else{
        $("#user_limit_error").text("");
      }


      if((start_date == '') || (start_date == undefined)){
        $("#start_date_error").text("This field are required");
        error = 0;
      }else{
        $("#start_date_error").text("");
      }

      if((end_date == '') || (end_date == undefined)){
        $("#end_date_error").text("This field are required");
        error = 0;
      }else{
        $("#end_date_error").text("");
      }

        if(error == 1){
           $("#add_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>