<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Add Policy</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Add Policy</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                  <form  id="add_form" name="add_form" class="form-horizontal" method="post" action="save.php" enctype="multipart/form-data">
                    <div class="row">

                      <div class="col-md-12">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Enter Title <span class="error_msg">*</span></label>
                          <input type="text" class="form-control" placeholder="Enter Title" name="title" id="title" aria-label="name" aria-describedby="basic-addon1">
                          <div class="error_msg" id="title_error"></div>
                       </div>
                      </div>
                      
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Description </label> <textarea class="form-control"  rows="10" name="description" id="description"></textarea>
                         </div>
                     </div>
                    
                     <button type="button" class="btn btn-primary" onclick="submitDetailsForm()">Add Policy</button>
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
      height:600,
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
      var title = $("#title").val();
      var description = $("#description").val();
      var event_to_date = $("#event_to_date").val();
      var event_time = $("#event_time").val();
      var city_name = $("#city_name").val();
      var event_image = $("#event_image").val();
      var event_price = $("#event_price").val();
      var event_no_of_ticket = $("#event_no_of_ticket").val();
      var event_type = $("#event_type").val();
      // alert(event_type);
      if((title == '') || (title == undefined)){
        $("#title_error").text("This field are required");
        error = 0;
      }else{
        $("#title_error").text("");
      }


        if(error == 1){
           $("#add_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>