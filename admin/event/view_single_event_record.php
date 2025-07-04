
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
                <h2 class="main-content-title fs-24 mb-1">View Event Record</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Event Details</a></li>
                    <!-- <li class="breadcrumb-item active" aria-current="page">Navs &amp; tabs</li> -->
                </ol>
            </div>
            <div class="d-flex">
                <div class="justify-content-center">
                    <a href="<?php echo $base_url ?>/event/view.php" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
        </div>
      <?php
          $pid=$_REQUEST['id'];
          $getdata="select * from tbl_event where id=$pid";  
          $gdata=mysqli_query($connect,$getdata);
          $rown=mysqli_fetch_array($gdata);
          
       
         
        ?>    


        <div class="row row-sm">
            <div class="col-xl-12">
                <div class="card custom-card">
                    
                    <div class="card-body">
                      <nav class="nav nav-pills flex-column flex-sm-row" role="tablist"> 
                        <a class="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-home" aria-selected="true">Event Details</a>

                         

                      </nav>
                        <div class="tab-content">
                          <div class="tab-pane show active text-muted" id="pill-flex-home" role="tabpanel">
                              <div class="tab_content">
                                <div class="row">
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Event Name:</b></span><span><?php echo $rown['event_name']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Event Start Date:</b></span><span><?php echo $rown['event_from_date']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Event End Date:</b></span><span><?php echo $rown['event_to_date']?></span> </p>
                                  </div>

                                  
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Event Time:</b></span><span><?php echo $rown['event_time']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Location:</b></span><span><?php echo $rown['formatted_address']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Image:</b></span><span><img class="thumb_image" src="<?php echo $image_url ?>/<?php echo $rown['event_image']  ?>"></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Event Type:</b></span><span><?php echo $rown['event_type']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Target Audience:</b></span><span>
                                      
                                      <?php if($rown['couple_male_female_swingers'] == '1'){ ?>
                                       <img src="<?php echo $base_url ?>/assets/img/icon/female-male.png" class="img-fluid wh-20 me-2" >
                                     <?php } ?>
                                     <?php if($rown['couple_female_female_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/female-female.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_female_female_swingers == '1'">
                                     <?php } ?>   
                                    <?php if($rown['couple_male_male_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/male-male.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_male_male_swingers == '1'">
                                    <?php } ?>   
                                    <?php if($rown['couple_male_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/male.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_male_swingers == '1'">
                                    <?php } ?>    
                                    <?php if($rown['couple_female_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/female.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_female_swingers == '1'">
                                    <?php } ?>    
                                    <?php if($rown['couple_transgender_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/transgender.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_transgender_swingers == '1'">  

                                    <?php } ?>

                                    </span> </p>
                                  </div>

                                  <!-- <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Price:</b></span><span>$<?php echo $rown['event_price']?></span> </p>
                                  </div> -->

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Number Of Ticket:</b></span><span><?php echo $rown['event_no_of_ticket']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Email Id:</b></span><span><?php echo $rown['event_email']?></span> </p>
                                  </div>

                                  <div class="col-md-12">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Description:</b></span><span><?php echo $rown['event_description']?></span> </p>
                                  </div>

                                  


                                  
                                </div>
                                <hr>
                                
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