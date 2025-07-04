
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
                <h2 class="main-content-title fs-24 mb-1">All Chocolate Factory User</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Users</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Chocolate Factory User</li>
                </ol>
            </div>
           
        </div>
        <!-- Page Header Close -->
        
        <!-- Start::row-1 -->
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title">Chocolate Factory User List </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               
                                <?php 

                                $userdata_admin_comission="select * from tbl_pay_per_click_admin_commission where id=1";
                                $guser_admin_comission=mysqli_query($connect,$userdata_admin_comission);
                                $rown_user_admin_comission=mysqli_fetch_array($guser_admin_comission);
                                $admin_commission_per = $rown_user_admin_comission['admin_commission'];
                                $user_commission_per = $rown_user_admin_comission['user_commission'];

                                  // echo $_GET['name'];

                                      if(!empty($_GET['name'])){
                                          $search_name = $_GET['name']; 
                                          $whereSQL1 = "AND f_name LIKE '%" . $search_name . "%'"; 
                                      } 

                                      if(!empty($_GET['status'])){
                                          $search_status = $_GET['status']; 
                                          $whereSQL2 = "AND status = $search_status"; 
                                      } 

                                      $sql = "select * from  tbl_pay_per_click  WHERE 1 = 1 {$whereSQL1} {$whereSQL2} order by created desc";
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
                                              <th>Updated Email</th>
                                              <th>Contact Number</th>
                                              <th>Payment Details</th>
                                              <th>Status</th>
                                              <th>Total Profit</th>
                                              <th>Admin Commission(<?php echo $admin_commission_per ?> %)</th>
                                              <th>Remaining Profit(<?php echo $user_commission_per ?> %)</th>
                                              <th>Image Status</th>
                                              <th>Video Status</th>
                                              <th>Preferences</th>
                                              <th>Profile Control</th>
                                              <th>Age</th>
                                              <th>Height</th>
                                              <th>Weight</th>
                                              
                                              
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

                                                $pay_per_id = $user['id'];
                                                $user_id = $user['user_id'];


                                                // total Image Profit 

                                                $total_user_profit =0;

                                                $user_image_profit="select * from tbl_pay_per_image_payment where pay_per_id=$pay_per_id";
                                                $guser_image_profit=mysqli_query($connect,$user_image_profit);
                                                $total_image_profit =0;
                                                 while ($row_image_profit = mysqli_fetch_assoc($guser_image_profit))
                                                  { 
                                                     $total_image_profit += $row_image_profit['image_price'];
                                                  }

                                                  // total Video Profit 

                                                $user_video_profit="select * from tbl_pay_per_video_payment where pay_per_id=$pay_per_id";
                                                $guser_video_profit=mysqli_query($connect,$user_video_profit);
                                                $total_video_profit =0;
                                                 while ($row_video_profit = mysqli_fetch_assoc($guser_video_profit))
                                                  { 
                                                     $total_video_profit += $row_video_profit['video_price'];
                                                  }


                                                $total_user_profit = $total_video_profit+$total_image_profit;

                                                // Admin Commition

                                                $admin_commission = (($total_user_profit*$admin_commission_per)/100);


                                                $remaining_commission = ($total_user_profit - $admin_commission) ;



                                                $view_url = 'view_couple_record.php?pid='.$user['id'];
                                               
                                               
                                                
                                                $userdata="select * from tbl_users where id=$user_id";
                                                $guser=mysqli_query($connect,$userdata);
                                                $rown_user=mysqli_fetch_array($guser);



                                                 $getdata_profile_image="select * from tbl_pay_per_click_image where pay_per_id=$pay_per_id and status=0";  
                                                $gdata_profile_image=mysqli_query($connect,$getdata_profile_image);
                                                $profile_image_no=mysqli_num_rows($gdata_profile_image);


                                                $getdata_profile_video="select * from tbl_pay_per_click_video where pay_per_id=$pay_per_id and status=0";  
                                                $gdata_profile_video=mysqli_query($connect,$getdata_profile_video);
                                                $profile_video_no=mysqli_num_rows($gdata_profile_video);



                                                ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td> <a href="view_couple_record.php?pid=<?php print $user['id']?>"><?php echo $rown_user['username']; ?></a></td>
                                                  <td><?php echo $user['updated_email']; ?></td>
                                                  <td><?php echo $user['contact_number']; ?></td>
                                                  <td><a href="view_payment_details.php?pid=<?php print $user['id']?>&user_id=<?php print $user['user_id']?>">View</a></td>

                                                  
                                                  
                                                  <td align="center" id="make_status_row_2">
                                                    <?php if($user['status'] == '1'){ ?>

                                                    <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=0&user_id=<?php echo $user['user_id']; ?>"  onclick="return confirm('Are you sure you want to change the status to not approve?')"><img src="<?php echo $base_url ?>/assets/img/tick.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"><br><span style="color: green">Approved</span></a>

                                                    <?php } else { ?> 
                                                    <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=1&user_id=<?php echo $user['user_id']; ?>" class="inactive_status" onclick="return confirm('Are you sure you want to change the status to  approved?')" id=""><img src="<?php echo $base_url ?>/assets/img/erase.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"><br><span style="color: red">Not Approve</span></a>
                                                    <?php } ?>                                         
                                                  </td>

                                                  <td>$<?php echo $total_user_profit ?></td>
                                                  <td>$<?php echo $admin_commission  ?></td>
                                                  <td>$<?php echo $remaining_commission ?></td>

                                                  <td>
                                                    <?php if($profile_image_no > 0){ ?>
                                                      <a href="<?php echo $view_url ?>" style="color: red;font-weight: bold;cursor: pointer;">Not Approved</a>
                                                     <?php }else{ ?>
                                                      <a href="<?php echo $view_url ?>" style="color: green;font-weight: bold;cursor: pointer;">Not Available</a>
                                                    <?php } ?>
                                                  </td>
                                                  <td>
                                                    <?php if($profile_video_no > 0){ ?>
                                                      <a href="<?php echo $view_url ?>" style="color: red;font-weight: bold;cursor: pointer;">Not Approved</a>
                                                     <?php }else{ ?>
                                                      <a href="<?php echo $view_url ?>" style="color: green;font-weight: bold;cursor: pointer;">Not Available</a>
                                                    <?php } ?>
                                                  </td>

                                                  <td><?php echo $user['preferences']; ?></td>
                                                  <td><?php echo $user['profile_control']; ?></td>
                                                  <td><?php echo $user['age']; ?></td>
                                                  <td><?php echo $user['height']; ?></td>
                                                  <td><?php echo $user['weight']; ?></td>
                                                  
                                                  <td> <?php echo $user['created']; ?></td>
                                                  <td>
                                                    <!-- <a href="edit.php?pid=<?php print $user['id']?>"><i class="fa fa-pencil-square-o"></i></a>&nbsp; -->
                                                    
                                                    
                                                    <a href="view_couple_record.php?pid=<?php print $user['id']?>"><i class="fa fa-eye"></i></a>&nbsp; 
                                                   
                                                    
                                                    
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
