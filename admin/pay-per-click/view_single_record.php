
<?php 
if(isset($_COOKIE['username'])){
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
                    <a href="<?php echo $base_url ?>/users/view.php" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
        </div>
      <?php
          $pid=$_REQUEST['pid'];
          $getdata="select * from tbl_users where id=$pid";  
          $gdata=mysqli_query($connect,$getdata);
          $rown=mysqli_fetch_array($gdata);
          $user_id = $rown['id'];

          $getdata_profile="select * from tbl_user_profile where user_id=$user_id";  
          $gdata_profile=mysqli_query($connect,$getdata_profile);
          $rown_profile=mysqli_fetch_array($gdata_profile);


          // $getdata_profile_image="select * from tbl_profile_image_image where user_id=$user_id";  
          // $gdata_profile_image=mysqli_query($connect,$getdata_profile_image);
          // $rown_profile_image=mysqli_fetch_array($gdata_profile_image);
          

          // $country_id = $rown['country_id'];
          // $state_id = $rown['state_id'];
          // $city_id = $rown['city_id'];

          // $make_id = $rown['make'];
          // $model_id = $rown['model'];

          // $getdata_cty="select * from tbl_countries where id=$country_id";  
          // $gdata_cty=mysqli_query($connect,$getdata_cty);
          // $rown_cty=mysqli_fetch_array($gdata_cty);
          // // $pid = $rown['id'];

          // $countrycode = $rown_cty['country_code'];
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
                          <a class="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-home" aria-selected="true">Personal Info</a>

                           <a class="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab"
                            role="tab" aria-current="page" href="#pill-flex-big" aria-selected="false" tabindex="-1">Photo</a>

                            <a class="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-about"
                            aria-selected="false" tabindex="-1">Video</a> 

                             <a class="flex-sm-fill text-sm-center nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-album"
                            aria-selected="false" tabindex="-1">Album</a> 

                        </nav>
                        <div class="tab-content">
                          <div class="tab-pane show active text-muted" id="pill-flex-home" role="tabpanel">
                              <div class="tab_content">
                                <div class="row">
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Profile Type:</b></span><span><?php echo $rown['profile_type']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Email:</b></span><span><?php echo $rown['email']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Username:</b></span><span><?php echo $rown['username']?></span> </p>
                                  </div>

                                  <?php if($rown['single_profile_gender_from'] != '0') { ?>
                                   <div class="col-md-4">
                                    <?php if($rown['single_profile_gender_from'] == '1') { ?>
                                      <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Gender:</b></span><span>Male</span> </p>
                                    <?php } ?>
                                    <?php if($rown['single_profile_gender_from'] == '2') { ?>
                                      <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Gender:</b></span><span>Female</span> </p>
                                    <?php } ?>
                                    <?php if($rown['single_profile_gender_from'] == '3') { ?>
                                      <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Gender:</b></span><span>Transgender</span> </p>
                                    <?php } ?>
                                    
                                    </div>
                                  <?php } ?>


                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>City:</b></span><span><?php echo $rown['city_name']?></span> </p>
                                  </div>
                                  <div class="col-md-12">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Address:</b></span><span><?php echo $rown['formatted_address']?></span> </p>
                                  </div>

                                  <hr>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Person Name:</b></span><span><?php echo $rown_profile['person1_name']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Text:</b></span><span><?php echo $rown_profile['text']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Comments:</b></span><span><?php echo $rown_profile['comment']?></span> </p>
                                  </div>

                                  <hr>

                                  
                                  <div class="col-md-12">
                                    <div class="row">
                                      <div class="col-md-4">
                                        <div class="profile_interest">INTERESTS</div>
                                        <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Couple Female/Male</b> </p>
                                        <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Couple Female/Female </b></p>
                                        <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Couple Male/Male</b></span></p>
                                        <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Male</b></span></p>
                                        <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Female</b></span></p>
                                        <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Transgender</b></span></p>

                                      </div>
                                      <div class="col-md-4">
                                        <div class="profile_interest">Swingers</div>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_male_female_swingers'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_female_female_swingers'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_male_male_swingers'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_male_swingers'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_female_swingers'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_transgender_swingers'] == '1'){ echo "checked"; }?>></p>

                                      </div>
                                      <div class="col-md-4">
                                        <div class="profile_interest">HOOKUP/MEETUP</div>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_male_female_hookup_meetup'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_female_female_hookup_meetup'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_male_male_hookup_meetup'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_male_hookup_meetup'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_female_hookup_meetup'] == '1'){ echo "checked"; }?>></p>
                                        <p class="text-muted ms-0 mb-2"><input type="checkbox" class="accent-maroon" <?php if($rown_profile['couple_transgender_hookup_meetup'] == '1'){ echo "checked"; }?>></p>
                                      </div>
                                    </div>
                                  </div>

                                  <hr>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>DOB:</b></span><span><?php echo $rown_profile['person1_dob']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Body Hair:</b></span><span><?php echo $rown_profile['person1_body_hair']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Height:</b></span><span><?php echo $rown_profile['person1_height']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Weight:</b></span><span><?php echo $rown_profile['person1_weight']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Body Type:</b></span><span><?php echo $rown_profile['person1_body_type']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Ethnic Background:</b></span><span><?php echo $rown_profile['person1_ethnic_background']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Smoking:</b></span><span><?php echo $rown_profile['person1_smoking']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Drinking:</b></span><span><?php echo $rown_profile['person1_drinking']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Piercings:</b></span><span><?php echo $rown_profile['person1_piercings']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Tattoos:</b></span><span><?php echo $rown_profile['person1_tattoos']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Language Spoken:</b></span><span><?php echo $rown_profile['person1_language_spoken']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Circumcised:</b></span><span><?php echo $rown_profile['person1_circumcised']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Intelligence as importance?:</b></span><span><?php echo $rown_profile['person1_intelligence_importance']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Sexuality:</b></span><span><?php echo $rown_profile['person1_sexuality']?></span> </p>
                                  </div>
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-2"><span class="font-weight-semibold me-2"><b>Relationship Orientation:</b></span><span><?php echo $rown_profile['person1_relationship_orientation']?></span> </p>
                                  </div>
                                  
                                </div>
                              </div>
                          </div> 

                          <div class="tab-pane text-muted" id="pill-flex-big" role="tabpanel">
                            <div class="tab_content">
                              <div class="row">

                                <?php 

                                 //echo "select * from tbl_profile_image where user_id=$user_id";
                                  $getdata_profile_image="select * from tbl_profile_image where user_id=$user_id";
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
                                                   <li><a href="change_image_status.php?id=<?php echo $profile_image['id']; ?>&status=0&url=view_single_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Not Approved</a></li>
                                                </ul>
                                            </div>
                                         <?php } ?>
                                         <?php if($profile_image['status'] == '0'){ ?>
                                            <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Not Approved</a>
                                            <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                <ul class="dropdown-menu">
                                                   <li><a href="change_image_status.php?id=<?php echo $profile_image['id']; ?>&status=1&url=view_single_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Approved</a></li>
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
                                  $getdata_profile_video="select * from tbl_profile_video where user_id=$user_id";
                                  $results_profile_video = mysqli_query($connect, $getdata_profile_video);

                                  $results_profile_video_no_rows = mysqli_num_rows($results_profile_video);

                                  if($results_profile_video_no_rows > 0){

                                    foreach ($results_profile_video as $profile_video){
                                    ?>
                                    <div class="col-lg-3 col-md-3 pb-4">
                                      <div class="card border-0 bg-dark rounded-5">
                                          <div class="d-flex justify-content-between rounded-top-5 p-2  <?php if($profile_video['status'] == '1'){ echo "approve-background"; } else{ echo "notapprove-background"; }?> ">
                                            <?php if($profile_video['status'] == '1'){ ?>
                                              <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Approved</a>
                                              <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                  <ul class="dropdown-menu">
                                                     <li><a href="change_video_status.php?id=<?php echo $profile_video['id']; ?>&status=0&url=view_single_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Not Approved</a></li>
                                                  </ul>
                                              </div>
                                           <?php } ?>
                                           <?php if($profile_video['status'] == '0'){ ?>
                                              <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Not Approved</a>
                                              <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                  <ul class="dropdown-menu">
                                                     <li><a href="change_video_status.php?id=<?php echo $profile_video['id']; ?>&status=1&url=view_single_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Approved</a></li>
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
                              <?php } else{ ?>
                                <p style="text-align: center;color: #800020;font-size: 16px;padding-top: 20px;font-weight: bold;">No Video Available</p>
                               <?php }  ?>
                              </div>
                            </div>      

                          </div>


                          <div class="tab-pane text-muted" id="pill-flex-album" role="tabpanel">
                            <div class="tab_content">
                              <div class="row">

                                <?php 

                                 //echo "select * from tbl_profile_image where user_id=$user_id";
                                  $getdata_profile_album="select * from tbl_user_album_image where user_id=$user_id";
                                  $results_profile_album = mysqli_query($connect, $getdata_profile_album);
                                  $results_profile_album_no_rows = mysqli_num_rows($results_profile_album);

                                if($results_profile_album_no_rows > 0){
                                    foreach ($results_profile_album as $profile_album){
                                    ?>
                                    <div class="col-lg-3 col-md-3 pb-4">
                                      <div class="card border-0 bg-dark rounded-5">
                                          <div class="d-flex justify-content-between rounded-top-5 p-2  <?php if($profile_album['status'] == '1'){ echo "approve-background"; } else{ echo "notapprove-background"; }?> ">
                                            <?php if($profile_album['status'] == '1'){ ?>
                                              <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Approved</a>
                                              <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                  <ul class="dropdown-menu">
                                                     <li><a href="change_album_status.php?id=<?php echo $profile_album['id']; ?>&status=0&url=view_single_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Not Approved</a></li>
                                                  </ul>
                                              </div>
                                           <?php } ?>
                                           <?php if($profile_album['status'] == '0'){ ?>
                                              <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">Not Approved</a>
                                              <div class="dropdown"><a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false" class="text-white"><i class="fa fa-pencil-square-o"></i></a>
                                                  <ul class="dropdown-menu">
                                                     <li><a href="change_album_status.php?id=<?php echo $profile_album['id']; ?>&status=1&url=view_single_record.php&page_id=<?php echo $rown['id']; ?>" class="dropdown-item" onclick="return confirm('Are you sure change status')">Approved</a></li>
                                                  </ul>
                                              </div>
                                           <?php } ?>

                                              
                                          </div>
                                          <a href="javascript:void(0)" class="fw-medium text-decoration-none text-white">

                                            <?php if($profile_album['image']) { ?>
                                            <img class="profile_img" src="<?php echo $image_url ?>/<?php echo $profile_album['image']  ?>">
                                            <?php } ?>
                                            <?php if($profile_album['video']) { ?>
                                            <video height="250" width="270" controls class="rounded-bottom-5 ">
                                              <source src="<?php echo $image_url ?>/<?php echo $profile_album['video']  ?>" >
                                            </video>
                                           <?php } ?>

                                            
                                          </a>
                                      </div>
                                  </div>
                                  <?php } ?>
                                <?php } else{ ?>
                                <p style="text-align: center;color: #800020;font-size: 16px;padding-top: 20px;font-weight: bold;">No Album Available</p>
                               <?php }  ?>  
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
<?php }else{
  header("location:index.php");
} ?>
<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<script>
jQuery(document).ready(function($) {
    $('#tblUser').DataTable({
      "pageLength": 25
      });
});
</script>