<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit Event Payment Type</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit Event Payment Type</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_event_payment_type where id=$pid";  
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
                          <label id="basic-addon1">Payment Name <span class="error_msg">*</span></label>
                          <input type="text" class="form-control"  name="payment_name" id="payment_name" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['payment_name']?>" readonly>
                          
                       </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Payment Type (% of Total Amount) <span class="error_msg">*</span></label>
                            <input type="text" class="form-control" aria-label="name" aria-describedby="basic-addon1" name="payment_type" id="payment_type" value="<?php echo $rown['payment_type']?>" readonly>
                           
                         </div>
                      </div>
                      <div class="col-md-4">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Payment Fee ($)<span class="error_msg">*</span></label>
                            <input type="text" class="form-control"  aria-label="name" aria-describedby="basic-addon1" name="payment_fee" id="payment_fee" value="<?php echo $rown['payment_fee']?>">
                            <div class="error_msg" id="payment_fee_error"></div>
                         </div>
                      </div>
                      
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1"> Description </label> <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="payment_description" id="payment_description"><?php echo $rown['payment_description']?></textarea>
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
      // alert();
      var error = 1;
      var payment_fee = $("#payment_fee").val();
      
      if((payment_fee == '') || (payment_fee == undefined)){
        $("#payment_fee_error").text("This field are required");
        error = 0;
      }else{
        $("#payment_fee_error").text("");
      }

        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>