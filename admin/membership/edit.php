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
            <h2 class="main-content-title fs-24 mb-1">edit Membership</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">edit Membership</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_membership where id=$pid";  
                $gdata=mysqli_query($connect,$getdata);
                $rowcount=mysqli_num_rows($gdata);
                if($rowcount==1) 
                {
                 $rown=mysqli_fetch_array($gdata);
                 $pid = $rown['id'];
                ?>  
                  <form  id="edit_form" name="edit_form" class="form-horizontal" method="post" action="update.php" enctype="multipart/form-data">
                    <div class="row">
                      <h3>First Line Edit Colum</h3>
                      <div class="col-md-4">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Title <span class="error_msg">*</span></label>
                          <input type="text" class="form-control"  name="heading_title_name" id="heading_title_name" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['heading_title_name']?>">
                          
                       </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Price ($)<span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  name="heading_title_price" id="heading_title_price" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['heading_title_price']?>">
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Date <span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  name="heading_title_plan" id="heading_title_plan" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['heading_title_plan']?>">
                         </div>
                      </div>
                      <hr>
                      <h3>Second Line Edit Colum</h3>
                      
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Price ($)<span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  name="sub_heading1_price" id="sub_heading1_price" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['sub_heading1_price']?>">
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Title <span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  name="sub_heading1_title" id="sub_heading1_title" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['sub_heading1_title']?>">
                         </div>
                      </div>
                      <hr>
                      <h3>Third Line Edit Colum</h3>
                      
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Price (%)<span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  name="sub_heading2_price" id="sub_heading2_price" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['sub_heading2_price']?>">
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Title <span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  name="sub_heading2_title" id="sub_heading2_title" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['sub_heading2_title']?>">
                         </div>
                      </div>
                       <hr>
                       <h3>Remaining Content</h3>
                      

                     
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Contant</label> <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="content" id="content"><?php echo $rown['content']?></textarea>
                         </div>
                     </div>
                    <input type="hidden" id="pid" name="pid" value='<?php echo $pid; ?>' >
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()">Update </button>
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