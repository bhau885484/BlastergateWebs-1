
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
                    <li class="breadcrumb-item"><a href="javascript:void(0)">View Chocolate Factory Details</a></li>
                    <!-- <li class="breadcrumb-item active" aria-current="page">Navs &amp; tabs</li> -->
                </ol>
            </div>
            <div class="d-flex">
                <div class="justify-content-center">
                   <a href="<?php echo $base_url ?>/pay-per-click/view.php" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
        </div>
      <?php
          $pid=$_REQUEST['pid'];
          $getdata="select * from tbl_pay_per_click where id=$pid";  
          $gdata=mysqli_query($connect,$getdata);
          $rown=mysqli_fetch_array($gdata);
          $user_id = $rown['id'];

          // $getdata_profile="select * from tbl_user_profile where user_id=$user_id";  
          // $gdata_profile=mysqli_query($connect,$getdata_profile);
          // $rown_profile=mysqli_fetch_array($gdata_profile);


          
        ?>    

        <?php
            if(isset($_SESSION['success'])){
                echo('<div class="alert alert-solid-success alert-dismissible fade show">'.$_SESSION['success'].'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x"></i></button> </div>
                 ');
                unset($_SESSION['success']);
            }
            if(isset($_SESSION['error'])){
                 echo('<div class="alert alert-solid-danger alert-dismissible fade show">'.$_SESSION['error'].'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x"></i></button> </div>
                 ');
                unset($_SESSION['error']);
            }
        ?>

        <div class="row row-sm">
            <div class="col-xl-12">
                <div class="card custom-card">
                    
                    <div class="card-body">
                        <nav class="nav nav-pills flex-column flex-sm-row" role="tablist"> 
                          <a class="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-home" aria-selected="true">Details</a>

                           <a class="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-album"
                            aria-selected="false" tabindex="-1">Calender</a> 

                           <a class="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab"
                            role="tab" aria-current="page" href="#pill-flex-big" aria-selected="false" tabindex="-1">Photo</a>

                            <a class="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-about"
                            aria-selected="false" tabindex="-1">Video</a> 

                            

                        </nav>
                        <div class="tab-content">
                          <div class="tab-pane show active text-muted" id="pill-flex-home" role="tabpanel">
                              <div class="tab_content">
                                <div class="row">
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>BBC Type:</b></span><span><?php echo $rown['bbc_type']?></span> </p>
                                  </div>
                                  <div class="col-md-8">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Preferences:</b></span><span><?php echo $rown['preferences']?></span> </p>
                                  </div>
                                 

                                  <hr>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Profile_control:</b></span><span><?php echo $rown['profile_control']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>State Of Residence:</b></span><span><?php echo $rown['state_of_residence']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Contact Number:</b></span><span><?php echo $rown['contact_number']?></span> </p>
                                  </div>
                                 

                                  <hr>

                                   <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Updated Email:</b></span><span><?php echo $rown['updated_email']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Screen Name:</b></span><span><?php echo $rown['screen_name']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Life Style Nickname:</b></span><span><?php echo $rown['life_style_nickname']?></span> </p>
                                  </div>
                                  

                                  <hr>
                                  <div class="col-md-12">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Life Style Website:</b></span><span><?php echo $rown['life_style_website']?></span> </p>
                                  </div>
                                 
                                  <hr>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Age:</b></span><span><?php echo $rown['age']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Height:</b></span><span><?php echo $rown['height']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Weight:</b></span><span><?php echo $rown['weight']?></span> </p>
                                  </div>

                                  <hr>
                                  <div class="col-md-3">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Face Picture:</b></span><span><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $rown['face_picture']  ?>"></span> </p>
                                  </div>

                                  <div class="col-md-3">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Shirtless Picture:</b></span><span><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $rown['shirtless_picture']  ?>"></span> </p>
                                  </div>
                                  <div class="col-md-3">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Full Body Picture:</b></span><span><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $rown['full_body_picture']  ?>"></span> </p>
                                  </div>
                                  <div class="col-md-3">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Validation Picture:</b></span><span><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $rown['validation_picture']  ?>"></span> </p>
                                  </div>
                                  <hr>
                                  <div class="col-md-12">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Self Description:</b></span><span><?php echo $rown['self_description']  ?></span> </p>
                                  </div>

                                 
                                 
                                 
                                 
                                 
                                  
                                </div>
                              </div>
                          </div> 

                           <div class="tab-pane text-muted" id="pill-flex-album" role="tabpanel">
                            <div class="tab_content">
                              <div class="row">

                                <div class="col-md-12">
                                 <table class="table table-bordered table-hover">
                                    <thead>
                                       <tr>
                                          <th class="text-black">#</th>
                                          <th class="text-black">User Name</th>
                                          <th class="text-black">end_time</th>
                                          <th class="text-black">Start Time</th>
                                          <th class="text-black">End Time</th>
                                          <!-- <th class="text-black">Remove</th> -->
                                       </tr>
                                    </thead>
                                    <tbody id="bookingTableBody">
                                      <?php 

                                       //echo "select * from tbl_profile_image where user_id=$user_id";
                                        $calender_count = 1;
                                        $getdata_calender="select * from tbl_pay_per_click_calender where pay_per_id=$user_id";
                                        $results_calender = mysqli_query($connect, $getdata_calender);
                                        foreach ($results_calender as $calender){
                                        ?>
                                       <tr >
                                          <!-- Bookings will be appended here -->
                                          <th class="text-black"><?php echo  $calender_count ?></th>
                                          <th class="text-black"><?php echo $calender['username'] ?></th>
                                          <td class="text-black"><?php echo $calender['calender_date'] ?></td>
                                          <td class="text-black"><?php echo $calender['start_time_12_formate'] ?></td>
                                          <td class="text-black"><?php echo $calender['end_time_12_formate'] ?></td>
                                          <!-- <td class="text-white"><button class="btn btn-danger" type="button" (click)="removeCalenderItem(calender_dls.id)"><i class="fa fa-trash"></i></button></td> -->

                                          
                                       </tr>
                                        <?php $calender_count++; } ?>
                                       
                                    </tbody>
                                 </table>
                              </div>

                                
                                  
                               
                                
                             
                              </div>
                            </div>      

                          </div>

                          <div class="tab-pane text-muted" id="pill-flex-big" role="tabpanel">
                            <div class="tab_content">
                              <div class="row">

                                <?php 

                                 //echo "select * from tbl_profile_image where user_id=$user_id";
                                   $getdata_profile_image="select * from tbl_pay_per_click_image where pay_per_id=$user_id";
                                  $results_profile_image = mysqli_query($connect, $getdata_profile_image);
                                  foreach ($results_profile_image as $profile_image){
                                  ?>
                                  <div class="col-lg-3 col-md-3 pb-4">
                                    <div class="card border-0 bg-dark rounded-5">
                                        <div class="d-flex justify-content-between rounded-top-5 p-2  <?php if($profile_image['status'] == '1'){ echo "approve-background"; } else{ echo "notapprove-background"; }?> ">
                                          <?php if($profile_image['status'] == '1'){ ?>
                                            <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Approved</a>
                                            <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                <ul class="dropdown-menu">
                                                   <li><a href="change_image_status.php?id=<?php echo $profile_image['id']; ?>&status=0&url=view_couple_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Not Approved</a></li>
                                                </ul>
                                            </div>
                                         <?php } ?>
                                         <?php if($profile_image['status'] == '0'){ ?>
                                            <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Not Approved</a>
                                            <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                <ul class="dropdown-menu">
                                                   <li><a href="change_image_status.php?id=<?php echo $profile_image['id']; ?>&status=1&url=view_couple_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Approved</a></li>
                                                </ul>
                                            </div>
                                         <?php } ?>

                                            
                                        </div>
                                        <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white"><img class="profile_img" src="<?php echo $image_url ?>/<?php echo $profile_image['image']  ?>"></a>
                                    </div>
                                </div>
                               
                                
                              <?php } ?>
                              </div>
                            </div>      

                          </div>
                           
                          <div class="tab-pane text-muted" id="pill-flex-about" role="tabpanel">
                            <div class="tab_content">
                              <div class="row">

                                <?php 

                                 //echo "select * from tbl_profile_image where user_id=$user_id";
                                  $getdata_profile_video="select * from tbl_pay_per_click_video where pay_per_id=$user_id";
                                  $results_profile_video = mysqli_query($connect, $getdata_profile_video);
                                  foreach ($results_profile_video as $profile_video){
                                  ?>
                                  <div class="col-lg-3 col-md-3 pb-4">
                                    <div class="card border-0 bg-dark rounded-5">
                                        <div class="d-flex justify-content-between rounded-top-5 p-2  <?php if($profile_video['status'] == '1'){ echo "approve-background"; } else{ echo "notapprove-background"; }?> ">
                                          <?php if($profile_video['status'] == '1'){ ?>
                                            <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Approved</a>
                                            <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                <ul class="dropdown-menu">
                                                   <li><a href="change_video_status.php?id=<?php echo $profile_video['id']; ?>&status=0&url=view_couple_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Not Approved</a></li>
                                                </ul>
                                            </div>
                                         <?php } ?>
                                         <?php if($profile_video['status'] == '0'){ ?>
                                            <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Not Approved</a>
                                            <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                <ul class="dropdown-menu">
                                                   <li><a href="change_video_status.php?id=<?php echo $profile_video['id']; ?>&status=1&url=view_couple_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Approved</a></li>
                                                </ul>
                                            </div>
                                         <?php } ?>

                                            
                                        </div>
                                        <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">
                                          <video height="250" width="270" controls class="rounded-bottom-5 ">
                                            <source src="<?php echo $image_url ?>/<?php echo $profile_video['video']  ?>" >
                                          </video>

                                          
                                        </a>
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