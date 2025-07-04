<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit Extra Room Night</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit Extra Room Night</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_extra_night_room where id=$pid";  
                $gdata=mysqli_query($connect,$getdata);
                $rowcount=mysqli_num_rows($gdata);
                if($rowcount==1) 
                {
                 $rown=mysqli_fetch_array($gdata);
                 $pid = $rown['id'];
                ?>  
                  <form  id="edit_form" name="edit_form" class="form-horizontal" method="post" action="update.php" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Title <span class="error_msg">*</span></label>
                          <input type="text" class="form-control"  name="title" id="title" placeholder="Enter Room Name" value="<?php echo $rown['title'] ?>">
                          <div class="error_msg" id="title_error"></div>
                       </div>
                      </div>
                      
                      <div class="col-md-3">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Price<span class="error_msg">*</span></label>
                          <input type="text" class="form-control"  name="price" id="price" placeholder="Price" value="<?php echo $rown['price'] ?>">
                          <div class="error_msg" id="price_error"></div>
                          <!-- <div class="error_msg" id="bed_qty_error"></div> -->
                       </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Fee<span class="error_msg">*</span></label>
                          <input type="text" class="form-control"  name="fee" id="fee" placeholder="fee" value="<?php echo $rown['fee'] ?>">
                          <div class="error_msg" id="fee_error"></div>
                          <!-- <div class="error_msg" id="bed_qty_error"></div> -->
                       </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">No. Of People Available <span class="error_msg">*</span></label>
                          <input type="number" class="form-control"  name="people_available" id="people_available" placeholder="No. Of People Available" value="<?php echo $rown['people_available'] ?>">
                          <div class="error_msg" id="people_available_error"></div>
                          <!-- <div class="error_msg" id="bed_qty_error"></div> -->
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
      // initMap();

      CKEDITOR.replace('full_description', {
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
      var fee = $("#fee").val();
      var title = $("#title").val();
      var price = $("#price").val();
      var people_available = $("#people_available").val();

      
      if((fee == '') || (fee == undefined)){
        $("#fee_error").text("This field are required");
        error = 0;
      }else{
        $("#fee_error").text("");
      }

      if((title == '') || (title == undefined)){
        $("#title_error").text("This field are required");
        error = 0;
      }else{
        $("#title_error").text("");
      }

      if((price == '') || (price == undefined)){
        $("#price_error").text("This field are required");
        error = 0;
      }else{
        $("#price_error").text("");
      }

      if((people_available == '') || (people_available == undefined)){
        $("#people_available_error").text("This field are required");
        error = 0;
      }else{
        $("#people_available_error").text("");
      }

     
        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>