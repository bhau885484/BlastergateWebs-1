<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit Chocolate Factory Admin Commission</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit Chocolate Factory Admin Commission</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_pay_per_click_admin_commission where id=$pid";  
                $gdata=mysqli_query($connect,$getdata);
                $rowcount=mysqli_num_rows($gdata);
                if($rowcount==1) 
                {
                 $rown=mysqli_fetch_array($gdata);
                 $pid = $rown['id'];
                ?>  
                  <form  id="edit_form" name="edit_form" class="form-horizontal" method="post" action="update-admin-commission.php" enctype="multipart/form-data">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">User Percentage <span class="error_msg">*</span></label>
                          <input type="text" class="form-control" placeholder="User Percentage" value="<?php echo $rown['user_commission']?>" name="user_commission" id="user_commission">
                          <div class="error_msg" id="user_commission_error"></div>
                       </div>
                      </div>
                      <div class="col-md-6">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Admin Percentage <span class="error_msg">*</span></label>
                            <input type="text" class="form-control" placeholder="Admin Percentage"  aria-label="name" aria-describedby="basic-addon1" name="admin_commission" id="admin_commission" value="<?php echo $rown['admin_commission']?>">
                            <div class="error_msg" id="admin_commission_error"></div>
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
  
     function submitDetailsForm() {

      var error = 1;
      var admin_commission = $("#admin_commission").val();
      var user_commission = $("#user_commission").val(); 

      if((admin_commission == '') || (admin_commission == undefined)){
        $("#admin_commission_error").text("This field are required");
        error = 0;
      }else{
        $("#admin_commission_error").text("");
      }

      if((user_commission == '') || (user_commission == undefined)){
        $("#user_commission_error").text("This field are required");
        error = 0;
      }else{
        $("#user_commission_error").text("");
      }

      
        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>