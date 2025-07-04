
<?php 
if(isset($_COOKIE['username'])){
 include("../conn-web/cw.php");
 include "../header.php";
?>

<?php 

  $url_user_id = $_GET['user_id'];
  $pay_per_id = $_GET['pid'];

  $userdata1="select * from tbl_users where id=$url_user_id";
  $guser1=mysqli_query($connect,$userdata1);
  $rown_user1=mysqli_fetch_array($guser1);
?>

<div class="main-content side-content pt-0">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
            <div>
                <h2 class="main-content-title fs-24 mb-1">View Payment Details (<?php echo $rown_user1['username'] ?>)</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Payment Details </a></li>
                    <li class="breadcrumb-item active" aria-current="page">View Payment Details</li>
                </ol>
            </div>
            <div class="d-flex">
                <div class="justify-content-center">
                   <a href="<?php echo $base_url ?>/pay-per-click/view.php" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
           
        </div>
        
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title">View Image Payment Details (<?php echo $rown_user1['username'] ?>) </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               
                                <?php 

                                      $sql = "select * from  tbl_pay_per_image_payment where pay_per_id = '$pay_per_id'";
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
                                              <th>Transaction Id</th>
                                              <th>Username</th>
                                              <th>Payment Type</th>
                                              <th>Payment Date</th>
                                              <th>Title</th>
                                              <th>Price</th>
                                              
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <?php if(!empty($arr_users)) 
                                            { ?>
                                              <?php 
                                              $count = 0;
                                              foreach($arr_users as $user) { 

                                                $pay_per_id = $user['pay_per_id'];
                                                $user_id = $user['user_id'];
                                                $payment_user_id = $user['payment_user_id'];

                                                $userdata="select * from tbl_users where id=$payment_user_id";
                                                $guser=mysqli_query($connect,$userdata);
                                                $rown_user=mysqli_fetch_array($guser);
                                               
                                              ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td><?php echo $user['transaction_id']; ?></td>
                                                  <td><?php echo $rown_user['username']; ?></td>
                                                  <td>Image</td>
                                                  
                                                  <td><?php echo $user['payment_date']; ?></td>
                                                  <td><?php echo $user['image_title']; ?></td>
                                                  <td>$<?php echo $user['image_price']; ?></td>
                                                 
                                              </tr>
                                              <?php $count++; } ?>
                                              <?php } ?>    
                                          </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title">View Video Payment Details (<?php echo $rown_user1['username'] ?>) </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               
                                <?php 

                                      $sql = "select * from  tbl_pay_per_video_payment where pay_per_id = '$pay_per_id'";
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
                                              <th>Transaction Id</th>
                                              <th>Username</th>
                                              <th>Payment Type</th>
                                              <th>Payment Date</th>
                                              <th>Title</th>
                                              <th>Price</th>
                                              
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <?php if(!empty($arr_users)) 
                                            { ?>
                                              <?php 
                                              $count = 0;
                                              foreach($arr_users as $user) { 

                                                $pay_per_id = $user['pay_per_id'];
                                                $user_id = $user['user_id'];
                                                $payment_user_id = $user['payment_user_id'];

                                                $userdata="select * from tbl_users where id=$payment_user_id";
                                                $guser=mysqli_query($connect,$userdata);
                                                $rown_user=mysqli_fetch_array($guser);
                                               
                                              ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td><?php echo $user['transaction_id']; ?></td>
                                                  <td><?php echo $rown_user['username']; ?></td>
                                                  <td>Video</td>
                                                  
                                                  <td><?php echo $user['payment_date']; ?></td>
                                                  <td><?php echo $user['video_title']; ?></td>
                                                  <td>$<?php echo $user['video_price']; ?></td>
                                                 
                                              </tr>
                                              <?php $count++; } ?>
                                              <?php } ?>    
                                          </tbody>
                                        </table>
                                    </div>
                                </div>
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
