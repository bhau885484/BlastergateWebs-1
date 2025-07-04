<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<style type="text/css">
  .form-control {
    color: #000!important;
}
</style>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit Payment Getway </h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit Payment Getway</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_payment_getway where id=$pid";  
                $gdata=mysqli_query($connect,$getdata);
                $rowcount=mysqli_num_rows($gdata);
                if($rowcount==1) 
                {
                 $rown=mysqli_fetch_array($gdata);
                 $pid = $rown['id'];
                ?>  
                  <form  id="edit_form" name="edit_form" class="form-horizontal" method="post" action="update.php" enctype="multipart/form-data">
                    <div class="row">
                      <!-- <h3>First Line Edit Colum</h3> -->
                      <div class="col-md-4">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Name</label>
                          <input type="text" class="form-control"  name="name" id="name" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['name']?>">
                          
                       </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Login Id</label>
                            <input type="text" class="form-control"  name="api_login_id" id="api_login_id" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['api_login_id']?>">
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Transaction Key</label>
                            <input type="text" class="form-control"  name="transaction_key" id="transaction_key" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['transaction_key']?>">
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Client Key</label>
                            <input type="text" class="form-control"  name="client_key" id="client_key" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['client_key']?>">
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Environment</label>
                            <input type="text" class="form-control"  name="environment" id="environment" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['environment']?>">
                         </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Logo <span class="error_msg">*</span></label>
                          <input type="file" class="form-control"  name="image" aria-label="name" aria-describedby="basic-addon1" id="image" accept="image/jpeg,image/jpg,image/png" enctype="multipart/form-data">
                          <?php if($rown['image']){ ?>
                            <img src="<?php echo $image_url ?>/<?php echo $rown['image']  ?>" width="100px;">
                          <?php } ?> 
                          
                       </div>
                     </div>

                      <hr>
                      
                    <input type="hidden" id="pid" name="pid" value='<?php echo $pid; ?>' >
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()"> Update </button>
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

      CKEDITOR.replace('content', {
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
      var heading_title_name = $("#heading_title_name").val();
      var heading_title_price = $("#heading_title_price").val();
      var heading_title_plan = $("#heading_title_plan").val();
      var sub_heading1_price = $("#sub_heading1_price").val();
      var sub_heading1_title = $("#sub_heading1_title").val();
      var sub_heading2_price = $("#sub_heading2_price").val();
      var sub_heading2_title = $("#sub_heading2_title").val();
      var content = $("#content").val();
        // alert();
        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>