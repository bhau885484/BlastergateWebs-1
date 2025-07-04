
<?php 
if($_COOKIE['username']){
include("../conn-web/cw.php");
include "../header.php";
?>

<div class="main-content side-content pt-0">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
            <div>
                <h2 class="main-content-title fs-24 mb-1">View Record</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">User Details</a></li>
                    <!-- <li class="breadcrumb-item active" aria-current="page">Navs &amp; tabs</li> -->
                </ol>
            </div>
            <div class="d-flex">
                <div class="justify-content-center">
                    <!-- <button type="button" class="btn btn-white btn-icon-text my-2 me-2 d-inline-flex align-items-center"> <i class="fe fe-download me-2 fs-14"></i> Import </button>
                    <button type="button" class="btn btn-white btn-icon-text my-2 me-2 d-inline-flex align-items-center"> <i class="fe fe-filter me-2 fs-14"></i> Filter </button> -->
                    <a href="<?php echo $base_url ?>/event/view_record.php?id=<?php echo $_REQUEST['back_id']?>" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
        </div>
      <?php
          $pid=$_REQUEST['id'];
          $getdata="select * from tbl_ticket_booking where id=$pid";  
          $gdata=mysqli_query($connect,$getdata);
          $rown=mysqli_fetch_array($gdata);
          
          $user_id = $rown['user_id'];

          $event_id = $rown['event_id'];
          $promo_code_id = $rown['promo_code_id'];
          $room_id = $rown['room_id'];
          

         
        ?>    


        <div class="row row-sm">
            <div class="col-xl-12">
                <div class="card custom-card">
                    
                    <div class="card-body">
                      <nav class="nav nav-pills flex-column flex-sm-row" role="tablist"> 
                        <a class="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-home" aria-selected="true">User Details</a>

                         

                      </nav>
                        <div class="tab-content">
                          <div class="tab-pane show active text-muted" id="pill-flex-home" role="tabpanel">
                              <div class="tab_content">
                                <div class="row">
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 1 First Name:</b></span><span><?php echo $rown['f_name_member_1']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 1 Last Name:</b></span><span><?php echo $rown['l_name_member_1']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 1 Email:</b></span><span><?php echo $rown['email_member_1']?></span> </p>
                                  </div>

                                  
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 1 Phone:</b></span><span><?php echo $rown['phone_member_1']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 1 Id Proof:</b></span><span><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $rown['id_proof_1']  ?>"></span> </p>
                                  </div>
                                </div>
                                <hr>
                                <?php if($rown['f_name_member_2']) { ?>
                                <div class="row">
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 2 First Name:</b></span><span><?php echo $rown['f_name_member_2']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 2 Last Name:</b></span><span><?php echo $rown['l_name_member_2']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 2 Email:</b></span><span><?php echo $rown['email_member_2']?></span> </p>
                                  </div>

                                  
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 2 Phone:</b></span><span><?php echo $rown['phone_member_2']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Member 2 Id Proof:</b></span>
                                      <?php if($rown['id_proof_2']) { ?>
                                      <span><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $rown['id_proof_2']  ?>"></span>
                                      <?php } ?>
                                       </p>
                                  </div>
                                </div>
                                <?php } ?>
                              </div>
                          </div> 

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End:: row-13 -->
    </div>
</div>



<?php include "../footer.php";  ?>
<?php } ?>
<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<script>
jQuery(document).ready(function($) {
    $('#tblUser').DataTable({
      "pageLength": 25
      });
});
</script>