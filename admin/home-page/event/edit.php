<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">edit Event</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">edit Event</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_event where id=$pid";  
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
                          <label id="basic-addon1">Enter Event Name <span class="error_msg">*</span></label>
                          <input type="text" class="form-control" placeholder="Enter event name" name="event_name" id="event_name" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['event_name']?>">
                          <div class="error_msg" id="event_name_error"></div>
                       </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Event From Date <span class="error_msg">*</span></label>
                            <input type="date" class="form-control" placeholder="Enter event from time"  aria-label="name" aria-describedby="basic-addon1" name="event_from_date" id="event_from_date" value="<?php echo $rown['event_from_date']?>">
                            <div class="error_msg" id="event_from_date_error"></div>
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Event To Date <span class="error_msg">*</span></label>
                            <input type="date" class="form-control" placeholder="Enter event to date"  aria-label="name" aria-describedby="basic-addon1" name="event_to_date" id="event_to_date" value="<?php echo $rown['event_to_date']?>">
                            <div class="error_msg" id="event_to_date_error"></div>
                         </div>
                      </div>
                      <div class="col-md-3">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Event Time <span class="error_msg">*</span></label>
                            <input type="time" class="form-control" placeholder="Enter event time"  aria-label="name" aria-describedby="basic-addon1" name="event_time" id="event_time" value="<?php echo $rown['event_time']?>">
                            <div class="error_msg" id="event_time_error"></div>
                         </div>
                      </div>
                     <div class="col-md-5">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Enter Location <span class="error_msg">*</span></label>
                          <input type="text" name="" id="location" name="location" class="form-control" placeholder="Enter Location..." value="<?php echo $rown['formatted_address']?>">
                          <input type="hidden" class="input-xlarge focused" name="lat"  id="lat" value="<?php echo $rown['lat']?>">
                          <input type="hidden" class="input-xlarge focused" name="lng" id="lng" value="<?php echo $rown['lng']?>">
                          <input type="hidden" class="input-xlarge focused" name="city_name" id="city_name" value="<?php echo $rown['city_name']?>">
                          <input type="hidden" class="input-xlarge focused" name="place_id" id="place_id" value="<?php echo $rown['place_id']?>">
                          <input type="hidden" class="input-xlarge focused" name="map_url" id="map_url" value="<?php echo $rown['map_url']?>">
                          <input type="hidden" class="input-xlarge focused" name="formatted_address" id="formatted_address" value="<?php echo $rown['formatted_address']?>" >
                          <!-- <div class="error_msg" id="city_name_error"></div> -->
                       </div>
                     </div>
                     <div class="col-md-4">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Event Banner <span class="error_msg">*</span></label>
                          <input type="file" class="form-control"  name="event_image" aria-label="name" aria-describedby="basic-addon1" id="event_image" accept="image/jpeg,image/jpg,image/png" enctype="multipart/form-data">
                          <?php if($rown['event_image']){ ?>
                            <img src="<?php echo $image_url ?>/<?php echo $rown['event_image']  ?>" width="100px;">
                          <?php } ?> 
                          
                       </div>
                     </div>

                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Event Type<span class="error_msg">*</span></label>
                          <select class="form-control" name="event_type" id="event_type">
                            <option value="">--Select Event--</option>
                            <option value="private" <?php if($rown['event_type'] == 'private'){ echo "selected"; }?>>Private</option>
                            <option value="public" <?php if($rown['event_type'] == 'public'){ echo "selected"; }?>>Public</option>
                          </select>
                          <div class="error_msg" id="event_type_error"></div>
                       </div>
                     </div>
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Event Target Audience<span class="error_msg">*</span></label>
                          <br>
                          <span class="swinger_icon"><input type="checkbox" name="couple_male_female_swingers" id="couple_male_female_swingers"  class="accent-maroon" <?php if($rown['couple_male_female_swingers'] == '1'){ echo "checked"; }?>> <img src="<?php echo $base_url ?>/assets/img/icon/female-male.png"></span>

                          <span class="swinger_icon"><input type="checkbox" name="couple_female_female_swingers" id="couple_female_female_swingers"  class="accent-maroon" <?php if($rown['couple_female_female_swingers'] == '1'){ echo "checked"; }?>> <img src="<?php echo $base_url ?>/assets/img/icon/female-female.png"></span>

                          <span class="swinger_icon"><input type="checkbox" name="couple_male_male_swingers" id="couple_male_male_swingers"  class="accent-maroon" <?php if($rown['couple_male_male_swingers'] == '1'){ echo "checked"; }?>> <img src="<?php echo $base_url ?>/assets/img/icon/male-male.png"></span>

                          <span class="swinger_icon"><input type="checkbox" name="couple_male_swingers" id="couple_male_swingers"  class="accent-maroon" <?php if($rown['couple_male_swingers'] == '1'){ echo "checked"; }?>> <img src="<?php echo $base_url ?>/assets/img/icon/male.png"></span>

                          <span class="swinger_icon"><input type="checkbox" name="couple_female_swingers" id="couple_female_swingers"  class="accent-maroon" <?php if($rown['couple_female_swingers'] == '1'){ echo "checked"; }?>> <img src="<?php echo $base_url ?>/assets/img/icon/female.png"></span>

                          <span class="swinger_icon"><input type="checkbox" name="couple_transgender_swingers" id="couple_transgender_swingers"  class="accent-maroon" <?php if($rown['couple_transgender_swingers'] == '1'){ echo "checked"; }?>> <img src="<?php echo $base_url ?>/assets/img/icon/transgender.png"></span>
                          
                         
                       </div>
                     </div>

                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Event Price <span class="error_msg">*</span></label>
                          <input type="text" class="form-control"  name="event_price" id="event_price" aria-label="name" aria-describedby="basic-addon1" placeholder="Event Price" value="<?php echo $rown['event_price']?>">
                          <div class="error_msg" id="event_price_error"></div>
                       </div>
                     </div>
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Event Number Of Ticket <span class="error_msg">*</span></label>
                          <input type="number" class="form-control"  name="event_no_of_ticket" id="event_no_of_ticket" aria-label="name" aria-describedby="basic-addon1" placeholder="Enter No. Of ticket" value="<?php echo $rown['event_no_of_ticket']?>">
                          <div class="error_msg" id="event_no_of_ticket_error"></div>
                       </div>
                     </div>
                     <div class="col-md-4">
                       <div class="form-group mb-3">
                          <label id="basic-addon1">Contact Email Id</label>
                          <input type="text" class="form-control"  aria-label="name" aria-describedby="basic-addon1" name="event_email" id="event_email" placeholder="Enter Event conact email" value="<?php echo $rown['event_email']?>">
                       </div>
                     </div>
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Event Description </label> <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="event_description" id="event_description"><?php echo $rown['event_description']?></textarea>
                         </div>
                     </div>
                    <input type="hidden" id="pid" name="pid" value='<?php echo $pid; ?>' >
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()">Update Event</button>
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
      var event_name = $("#event_name").val();
      var event_from_date = $("#event_from_date").val();
      var event_to_date = $("#event_to_date").val();
      var event_time = $("#event_time").val();
      var city_name = $("#city_name").val();
      var event_image = $("#event_image").val();
      var event_price = $("#event_price").val();
      var event_no_of_ticket = $("#event_no_of_ticket").val();

      if((event_name == '') || (event_name == undefined)){
        $("#event_name_error").text("This field are required");
        error = 0;
      }else{
        $("#event_name_error").text("");
      }

      if((event_from_date == '') || (event_from_date == undefined)){
        $("#event_from_date_error").text("This field are required");
        error = 0;
      }else{
        $("#event_from_date_error").text("");
      }

      if((event_to_date == '') || (event_to_date == undefined)){
        $("#event_to_date_error").text("This field are required");
        error = 0;
      }else{
        $("#event_to_date_error").text("");
      }

      if((event_time == '') || (event_time == undefined)){
        $("#event_time_error").text("This field are required");
        error = 0;
      }else{
        $("#event_time_error").text("");
      }
     

      if((event_price == '') || (event_price == undefined)){
        $("#event_price_error").text("This field are required");
        error = 0;
      }else{
        $("#event_price_error").text("");
      }
      

      if((event_no_of_ticket == '') || (event_no_of_ticket == undefined)){
        $("#event_no_of_ticket_error").text("This field are required");
        error = 0;
      }else{
        $("#event_no_of_ticket_error").text("");
      }
     

        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>