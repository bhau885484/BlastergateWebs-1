
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
                <h2 class="main-content-title fs-24 mb-1">All Users</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Users</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Users</li>
                </ol>
            </div> 
           <!--  <div class="d-flex">
                <div class="justify-content-center">
                    <button type="button" class="btn btn-white btn-icon-text my-2 me-2 d-inline-flex align-items-center"> <i class="fe fe-download me-2 fs-14"></i> Import </button>
                    <button type="button" class="btn btn-white btn-icon-text my-2 me-2 d-inline-flex align-items-center"> <i class="fe fe-filter me-2 fs-14"></i> Filter </button>
                    <button type="button" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fe fe-download-cloud me-2 fs-14"></i> Download Report </button>
                </div>
            </div> -->
        </div>
        <!-- Page Header Close -->
        
        <!-- Start::row-1 -->
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title"> User List </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               
                                <?php 

                                  // echo $_GET['name'];

                                      if(!empty($_GET['name'])){
                                          $search_name = $_GET['name']; 
                                          $whereSQL1 = "AND f_name LIKE '%" . $search_name . "%'"; 
                                      } 

                                      if(!empty($_GET['status'])){
                                          $search_status = $_GET['status']; 
                                          $whereSQL2 = "AND status = $search_status"; 
                                      } 

                                      $sql = "select * from  tbl_users  WHERE 1 = 1 {$whereSQL1} {$whereSQL2} order by created desc";
                                      $result = mysqli_query($connect,$sql);
                                      $arr_users = [];
                                      if ($result->num_rows > 0) {
                                          $arr_users = $result->fetch_all(MYSQLI_ASSOC);
                                      }

                                      ?>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table id="tblUser" class="table table-hover table-bordered">
                                          <thead>
                                            <tr>
                                              <th>S.No.</th>
                                              <th>Username</th>
                                              <th>Email</th>
                                              <th>Profile Type</th>
                                              <th>Address</th>
                                              <th>Total Booking</th>
                                              <th>Status</th>
                                              <th>Image Status</th>
                                              <th>Video Status</th>
                                              <th>Album Status</th>
                                              <th>Created</th>
                                              <th>&nbsp;</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <?php if(!empty($arr_users)) 
                                            { ?>
                                              <?php 
                                              $count = 0;
                                              foreach($arr_users as $user) { 

                                                $user_id = $user['id'];

                                                if($user['profile_type'] == 'single'){ 
                                                   $view_url = 'view_single_record.php?pid='.$user['id'];
                                                }else{
                                                  $view_url = 'view_couple_record.php?pid='.$user['id'];
                                                }
                                                
                                                $getdata_profile_image="select * from tbl_profile_image where user_id=$user_id and status=0";  
                                                $gdata_profile_image=mysqli_query($connect,$getdata_profile_image);
                                                $profile_image_no=mysqli_num_rows($gdata_profile_image);


                                                $getdata_profile_video="select * from tbl_profile_video where user_id=$user_id and status=0";  
                                                $gdata_profile_video=mysqli_query($connect,$getdata_profile_video);
                                                $profile_video_no=mysqli_num_rows($gdata_profile_video);

                                                $getdata_profile_album="select * from tbl_user_album_image where user_id=$user_id and status=0";  
                                                $gdata_profile_album=mysqli_query($connect,$getdata_profile_album);
                                                $profile_album_no=mysqli_num_rows($gdata_profile_album);

                                                
                                                $getdata_total_booking="select * from tbl_event_ticket_booking where user_id=$user_id";  
                                                $gdata_total_booking=mysqli_query($connect,$getdata_total_booking);
                                                $total_booking=mysqli_num_rows($gdata_total_booking);


                                                ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td><?php echo $user['username']; ?></td>
                                                  <td><?php echo $user['email']; ?></td>
                                                  <td><?php echo $user['profile_type']; ?></td>
                                                  <td><?php echo $user['formatted_address']; ?></td>
                                                  <td><a href="<?php echo $base_url ?>/ticket-booking/view.php?user_id=<?php echo $user_id ?>" style="cursor:pointer;font-weight: bold;"><?php echo $total_booking; ?></a></td>

                                                  
                                                  <td align="center" id="make_status_row_2">
                                                    <?php if($user['status'] == '1'){ ?>

                                                    <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=0" id="" onclick="return confirm('Are you sure you want to change the status to deactivate?')"><img src="<?php echo $base_url ?>/assets/img/tick.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>

                                                    <?php } else { ?> 
                                                    <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=1" class="inactive_status" onclick="return confirm('Are you sure you want to change the status to activate?')" id=""><img src="<?php echo $base_url ?>/assets/img/erase.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                                    <?php } ?>                                         
                                                  </td>
                                                  <td>
                                                    <?php if($profile_image_no > 0){ ?>
                                                      <a href="<?php echo $view_url ?>&type=image" style="color: red;font-weight: bold;cursor: pointer;">Not Approved</a>
                                                     <?php }else{ ?>
                                                      <a href="<?php echo $view_url ?>&type=image" style="color: green;font-weight: bold;cursor: pointer;">Not Available</a>
                                                    <?php } ?>
                                                  </td>
                                                  <td>
                                                    <?php if($profile_video_no > 0){ ?>
                                                      <a href="<?php echo $view_url ?>&type=video" style="color: red;font-weight: bold;cursor: pointer;">Not Approved</a>
                                                     <?php }else{ ?>
                                                      <a href="<?php echo $view_url ?>&type=video" style="color: green;font-weight: bold;cursor: pointer;">Not Available</a>
                                                    <?php } ?>
                                                  </td>
                                                  <td>
                                                    <?php if($profile_album_no > 0){ ?>
                                                      <a href="<?php echo $view_url ?>&type=album" style="color: red;font-weight: bold;cursor: pointer;">Not Approved</a>
                                                     <?php }else{ ?>
                                                      <a href="<?php echo $view_url ?>&type=album" style="color: green;font-weight: bold;cursor: pointer;">Not Available</a>
                                                    <?php } ?>
                                                  </td>

                                                  <td><?php echo date("d M Y", strtotime($user['created'])); ?></td>
                                                  <td>
                                                    <!-- <a href="edit.php?pid=<?php print $user['id']?>"><i class="fa fa-pencil-square-o"></i></a>&nbsp; -->
                                                    <?php if($user['profile_type'] == 'single'){ ?>
                                                    <a href="view_single_record.php?pid=<?php print $user['id']?>&type=profile"><i class="fa fa-eye"></i></a>&nbsp; 
                                                    <?php } ?>
                                                    <?php if($user['profile_type'] == 'couple'){ ?>
                                                    <a href="view_couple_record.php?pid=<?php print $user['id']?>&type=profile"><i class="fa fa-eye"></i></a>&nbsp; 
                                                    <?php } ?>
                                                    
                                                    
                                                    <a href="delete.php?pid=<?php echo $user['id']; ?>" class="delete_status" onclick="return confirm('Are you sure delete product?')" ><i class="fa fa-trash"></i></a>&nbsp;
                                                    
                                                  </td>
                                              </tr>
                                              <?php $count++; } ?>
                                              <?php } ?>    
                                          </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!-- <div class="row">
                                    <div class="col-sm-12 col-md-5">
                                        <div class="dataTables_info" id="datatable-basic_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                    </div>
                                    <div class="col-sm-12 col-md-7">
                                        <div class="dataTables_paginate paging_simple_numbers" id="datatable-basic_paginate">
                                            <ul class="pagination">
                                                <li class="paginate_button page-item previous disabled" id="datatable-basic_previous"><a href="#" aria-controls="datatable-basic" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>
                                                <li class="paginate_button page-item active"><a href="#" aria-controls="datatable-basic" data-dt-idx="1" tabindex="0" class="page-link">1</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="datatable-basic" data-dt-idx="2" tabindex="0" class="page-link">2</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="datatable-basic" data-dt-idx="3" tabindex="0" class="page-link">3</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="datatable-basic" data-dt-idx="4" tabindex="0" class="page-link">4</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="datatable-basic" data-dt-idx="5" tabindex="0" class="page-link">5</a></li>
                                                <li class="paginate_button page-item "><a href="#" aria-controls="datatable-basic" data-dt-idx="6" tabindex="0" class="page-link">6</a></li>
                                                <li class="paginate_button page-item next" id="datatable-basic_next"><a href="#" aria-controls="datatable-basic" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
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
