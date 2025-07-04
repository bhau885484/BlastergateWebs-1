<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit Policy</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit Policy</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_policy where id=$pid";  
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
                          <label id="basic-addon1">Title <span class="error_msg">*</span></label>
                          <input type="text" class="form-control" placeholder="Enter Title" name="title" id="title" aria-label="name" aria-describedby="basic-addon1" value="<?php echo $rown['title']?>">
                          <div class="error_msg" id="title_error"></div>
                       </div>
                      </div>
                     
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Description </label> <textarea class="form-control"  rows="3" name="description" id="description"><?php echo $rown['description']?></textarea>
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
      
      if((title == '') || (title == undefined)){
        $("#title_error").text("This field are required");
        error = 0;
      }else{
        $("#title_error").text("");
      }

      

        if(error == 1){
           $("#edit_form").submit();
        }
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>