<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<style type="text/css">
  .ms-parent{
    width: 570px!important;
  }
</style>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Landing Page Data </h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Landing Page</li>
            </ol>
         </div>
        
      </div>

       <?php
        
          $getdata="select * from tbl_landing_page where id=1";  
          $gdata=mysqli_query($connect,$getdata);
          $rown=mysqli_fetch_array($gdata);
          $pid = $rown['id'];
          ?>  

      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                  <form  id="add_form" name="add_form" class="form-horizontal" method="post" action="update.php" enctype="multipart/form-data">
                    <div class="row">
                      
                     
                      <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Title</label>
                            <input type="text" class="form-control" placeholder="Enter Title"  aria-label="name" aria-describedby="basic-addon1" name="title" id="title" value="<?php echo $rown['title']?>">
                            
                         </div>
                      </div>
                     
                      
                     <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">First Video</label>
                          <input type="file" class="form-control"  name="first_video" aria-label="name" aria-describedby="basic-addon1" id="first_video" accept=".ogg, .mp4, .mov,.3gp"  enctype="multipart/form-data">
                          <video width='100%' height='360' controls>
                              <source src="<?php echo $image_url ?>/<?php echo $rown['first_video']?>" type="video/mp4">
                                    Your browser does not support the video tag.
                          </video>
                          <!-- <div class="error_msg" id="image_error"></div> -->
                       </div>
                     </div>

                     <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Second Video</label>
                          <input type="file" class="form-control"  name="second_video" aria-label="name" aria-describedby="basic-addon1" id="second_video" accept=".ogg, .mp4, .mov,.3gp"  enctype="multipart/form-data">
                          <video width='100%' height='360' controls>
                              <source src="<?php echo $image_url ?>/<?php echo $rown['second_video']?>" type="video/mp4">
                                    Your browser does not support the video tag.
                          </video>
                          <!-- <div class="error_msg" id="image_error"></div> -->
                       </div>
                     </div>
                     
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Slider Image </label> <input type="file" class="form-control" name="slider_image[]" id="slider_image" multiple accept="image/jpeg,image/jpg,image/png">

                            <div id="image-gallery">
                              <?php

                             $slider_image = explode(",", $rown['slider_image']);
                              // Display uploaded images
                              $uploadDir = $image_url;
                              
                                  
                                  foreach ($slider_image as $image) { ?>
                                      <div style='display: inline-block; margin: 10px; text-align: center;'>
                                          <img src='<?php echo $image_url?>/<?php echo $image?>' alt='$image' style='width: 130px; height: 130px; object-fit: cover;'><br>
                                          <a href="delete.php?pid=<?php echo $rown['id']; ?>&image=<?php echo $image?>" class="delete_status" onclick="return confirm('Are you sure delete image?')" style="background: #800020;color: #fff;padding: 7px 59px;cursor: pointer;"><i class="fa fa-trash"></i></a>&nbsp; 
                                      </div>
                                  <?php }
                              
                              ?>
                            </div>
                         </div>
                     </div>
                    <input type="hidden" id="pid" name="pid" value='<?php echo $pid; ?>' >
                           
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()">Send</button>
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
      
      CKEDITOR.replace('description', {
      height:200,
      uiColor: '#CCEAEE',
      contentsCss: [
          'http://cdn.ckeditor.com/4.23.0-lts/full-all/contents.css',
          'https://ckeditor.com/docs/ckeditor4/4.23.0-lts/examples/assets/css/classic.css'
        ],
       
          
          filebrowserUploadMethod: 'form'
      });


  });


     function submitDetailsForm() {

          $('#preloader').show();
           $("#add_form").submit();
        
       
    }


  function fetchUser(event_id){

    
    $.ajax({
         url:"<?php echo $base_url ?>/notification/fetch_user.php",
        method:"POST",
        data:{event_id:event_id},
                
         success:function(data)
         {
          // console.log(data);
          $('#user_details').html('');
          $('#user_details').html(data);
          
         }
        });
  }




</script>
<script type="text/javascript">
    $("#rider_list_dropdown").multipleSelect({
      filter: true,
      multiple: true,
      multipleWidth: 600,
      
      within: window,
      onCheckAll: function () {

             var vall=$('#rider_list_dropdown').multipleSelect('getSelects');
             
             $('#useraarray').val("");
             $('#useraarray').val(vall);

         },

        onUncheckAll: function () {

             $('#useraarray').val("");

        },

        onClick: function () {

             var vall=$('#rider_list_dropdown').multipleSelect('getSelects');
             
             $('#useraarray').val("");
             $('#useraarray').val(vall);

        },
    });
</script>

<?php }else{
  header("location:index.php");
} ?>