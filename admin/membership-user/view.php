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
            <h2 class="main-content-title fs-24 mb-1">All Membership User</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">All Membership User</li>
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
                  <div class="card-title"> Membership User List </div>
               </div>
               <div class="card-body">
                  <div class="table-responsive">
                     <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

                      <?php 
                            
                            $sql = "select * from  tbl_purchase_membership";
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
                                       <th>S.NO.</th>
                                       <th>Username</th>
                                       <th>Transction Id</th>
                                       <th>Plan</th>
                                       <th>Discount on event</th>
                                       <th>Payment Status</th>
                                       <th>Payment Date</th>
                                       <th>Payment Valid Date</th>
                                       <!-- <th>No. Of Ticket</th>
                                       <th>Join User Count</th>
                                       <th>Status</th> -->
                                       <!-- <th>Action</th> -->
                                    </tr>
                                 </thead>
                                 <tbody>
                                  <?php if(!empty($arr_users)) 
                                  { ?>
                                    <?php 
                                    $count = 0;
                                    foreach($arr_users as $user) { 
                                       $user_id = $user['user_id'];
                                       $membership_id = $user['membership_id'];

                                        $getdata="select * from tbl_users where id=$user_id";  
                                        $gdata=mysqli_query($connect,$getdata);
                                        $user_data=mysqli_fetch_array($gdata);


                                        $getdata1="select * from tbl_membership where id=$membership_id";  
                                        $gdata1=mysqli_query($connect,$getdata1);
                                        $membership_data=mysqli_fetch_array($gdata1);
                                        
                                    ?>
                                    <tr>
                                       <td><?php print  $count+1; ?></td>
                                       <td><?php echo $user_data['username']?></td>
                                       <td><?php echo $user['transaction_id']; ?></td>
                                       <td><?php echo $user['plan_name']; ?>&nbsp;$<?php echo $user['plan_price']; ?>/<?php echo $user['plan_year']; ?></td>
                                       <td>$<?php echo $membership_data['sub_heading1_price']; ?></td>
                                       <td>
                                          <?php if($user['payment_status'] == '1'){ ?>
                                           <span style="color:yellow">Pending</span>
                                          <?php  } ?>
                                           <?php if($user['payment_status'] == '2'){ ?>
                                           <span style="color:green">Success</span>
                                          <?php  } ?>
                                           <?php if($user['payment_status'] == '3'){ ?>
                                           <span style="color:red">Failed</span>
                                          <?php  } ?>

                                       </td>
                                       <td><?php echo $user['payment_date']; ?></td>
                                       <td><?php echo $user['plan_valid_from_date']; ?> To <?php echo $user['plan_valid_to_date']; ?></td>

                                      

                                       
                                       
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