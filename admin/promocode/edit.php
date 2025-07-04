<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit Promo Code</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit Promo Code</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_promocode where id=$pid";  
                $gdata=mysqli_query($connect,$getdata);
                $rowcount=mysqli_num_rows($gdata);
                if($rowcount==1) 
                {
                 $rown=mysqli_fetch_array($gdata);
                 $pid = $rown['id'];
                ?>  
                <form  id="edit_form" name="edit_form" class="form-horizontal" method="post" action="update.php" enctype="multipart/form-data">
                     <div class="row">
                      <div class="col-md-4">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Promo Code Title <span class="error_msg">*</span></label>
                          <input type="text" class="form-control" placeholder="Promo Code Title " name="promo_code" id="promo_code" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['promo_code']?>">
                          <div class="error_msg" id="promo_code_error"></div>
                       </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Promo Type </label>
                             <select class="form-select" aria-label="Default select example" name="promo_type" id="promo_type">
                              <option selected value="">Select Type</option>
                             <!--  <option value="1" <?php if($rown['promo_type'] == '1'){ echo "selected"; }?>>Percentage</option> -->
                              <option value="2" <?php if($rown['promo_type'] == '2'){ echo "selected"; }?>>Fixed Amount</option>
                           </select>
                            <!-- <div class="error_msg" id="promo_type_error"></div> -->
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <div class="form-group mb-3">
                             <label id="basic-addon1">Discount Value</label>
                             <input type="nimber" class="form-control" name="promo_price" id="promo_price" placeholder="Discount Value" value="<?php echo $rown['promo_price']?>">
                              <!-- <div class="error_msg" id="promo_price_error"></div> -->
                         </div>
                      </div>
                    </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">User Limit</label>
                           <input type="text" class="form-control" name="user_limit" id="user_limit" placeholder="1-100 User" value="<?php echo $rown['user_limit']?>">
                            <!-- <div class="error_msg" id="user_limit_error"></div> -->
                         </div>
                      </div>
                     
                    
                     
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Promo Code From Date</label>
                           <input class="form-control" type="date" name="start_date" id="start_date" value="<?php echo $rown['start_date']?>">
                           <!-- <div class="error_msg" id="start_date_error"></div> -->
                       </div>
                     </div>
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Promo Code To Date</label>
                           <input class="form-control" type="date" name="end_date" id="end_date" value="<?php echo $rown['end_date']?>">
                           <!-- <div class="error_msg" id="end_date_error"></div> -->
                       </div>
                     </div>
                     <div class="col-md-12">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Description</label>
                           <textarea class="form-control" id="description" name="description" rows="3"><?php echo $rown['description']?></textarea>
                          
                       </div>
                     </div>
                     
                    <input type="hidden" id="pid" name="pid" value='<?php echo $pid; ?>' >
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()">Update</button>
                  </form>
                <?php } ?>  
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

       if((promo_code == '') || (promo_code == undefined)){
        $("#promo_code_error").text("This field are required");
        error = 0;
      }else{
        $("#promo_code_error").text("");
      }

        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>