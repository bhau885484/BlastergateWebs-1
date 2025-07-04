<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Send Notification</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Send Notification</li>
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
                          <label id="basic-addon1">Select Event Name <span class="error_msg">*</span></label>
                          <select  name="event_id" class="form-control" id="event_id" required="required" onchange="fetchUser(event.target.value)">
                              <option value="">--Select Event--</option> 
                              <?php 
                              $current_date = date('Y-m-d');
                              $query="SELECT * FROM tbl_event WHERE event_from_date > '$current_date' and status=1";
                              $results = mysqli_query($connect, $query);
                              foreach ($results as $event_list){
                              ?>
                              <option value="<?php echo $event_list["id"];?>"><?php echo $event_list["event_name"];?></option> 
                              <?php } ?>
                            </select>
                          <div class="error_msg" id="event_name_error"></div>
                       </div>
                      </div>
                      <div class="col-md-8">
                         <div class="form-group mb-3" id="user_details">
                          
                         </div>
                      </div>
                      <div class="col-md-6">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Title</label>
                            <input type="text" class="form-control" placeholder="Enter Title"  aria-label="name" aria-describedby="basic-addon1" name="title" id="title">
                            
                         </div>
                      </div>
                      
                     <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Image</label>
                          <input type="file" class="form-control"  name="image" aria-label="name" aria-describedby="basic-addon1" id="image" accept="image/jpeg,image/jpg,image/png" enctype="multipart/form-data">
                          <!-- <div class="error_msg" id="image_error"></div> -->
                       </div>
                     </div>
                     
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Content </label> <textarea class="form-control"  rows="3" name="description" id="description"></textarea>
                         </div>
                     </div>
                    <input type="hidden" id="useraarray" value="" name="user_id">
                           
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

      var error = 1;
      var event_id = $("#event_id").val();
      
      if((event_id == '') || (event_id == undefined)){
        $("#event_id_error").text("This field are required");
        error = 0;
      }else{
        $("#event_id_error").text("");
      }

      if(error == 1){
          $('#preloader').show();
           $("#add_form").submit();
        }
       
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


<?php }else{
  header("location:index.php");
} ?>