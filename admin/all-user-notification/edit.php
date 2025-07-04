<?php
if(isset($_COOKIE['username'])){
    include("../conn-web/cw.php");
?>
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Edit User Notification</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Edit User Notification</li>
            </ol>
         </div>
        
      </div>
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                <?php
                $pid=$_REQUEST['pid'];
                $getdata="select * from tbl_all_user_notification where id=$pid";  
                $gdata=mysqli_query($connect,$getdata);
                $rowcount=mysqli_num_rows($gdata);
                if($rowcount==1) 
                {
                 $rown=mysqli_fetch_array($gdata);
                 $pid = $rown['id'];
                ?>  
                  <form  id="edit_form" name="edit_form" class="form-horizontal" method="post" action="update.php" enctype="multipart/form-data">
                    <div class="row">
                      
                      <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Title</label>
                            <input type="text" class="form-control" placeholder="Enter Title"  aria-label="name" aria-describedby="basic-addon1" name="title" id="title" value="<?php echo $rown['title'] ?>">
                            
                         </div>
                      </div>


                      
                     <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Image</label>
                          <input type="file" class="form-control"  name="image" aria-label="name" aria-describedby="basic-addon1" id="image" accept="image/jpeg,image/jpg,image/png" enctype="multipart/form-data">
                          <div class="controls1">
                            <?php if($rown['image']){ ?>

                               <a class ="img_hyper" href="<?php echo $image_url ?>/<?php echo $rown['image']?>" target="_blank">
                                <img class="thumb_image1" src="<?php echo $image_url ?>/<?php echo $rown['image']  ?>" style="width:150px;">
                                
                              </a> 

                            <?php } ?>         
                            </div>
                          <!-- <div class="error_msg" id="image_error"></div> -->
                       </div>
                     </div>

                     <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label id="basic-addon1">Video</label>
                          <input type="file" class="form-control"  name="video" aria-label="name" aria-describedby="basic-addon1" id="video" accept=".ogg, .mp4, .mov,.3gp"  enctype="multipart/form-data">
                          <div class="controls1">
                            <?php if($rown['image']){ ?>
                               <video height="200" width="200" controls class="rounded-bottom-5 ">
                                <source src="<?php echo $image_url ?>/<?php echo $rown['video']  ?>" >
                              </video>

                            <?php } ?>         
                            </div>

                          <!-- <div class="error_msg" id="image_error"></div> -->
                       </div>
                     </div>
                     
                     <div class="col-md-12">
                         <div class="form-group mb-3">
                            <label id="basic-addon1">Enter Content </label> <textarea class="form-control"  rows="3" name="description" id="description" value="<?php echo $rown['description'] ?>"></textarea>
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

<style type="text/css">
  .thumb_image1 {
    width: 150px;
}
</style>
<script type="text/javascript">
  $( document ).ready(function() {
      // initMap();

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

      $("#edit_form").submit();
       
    }
</script>
<?php }else{
  header("location:index.php");
} ?>