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
            <h2 class="main-content-title fs-24 mb-1">Payment Gateway List Management</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">All Payment Gateway List</li>
            </ol>
         </div>
       
      </div>
      <!-- Page Header Close -->
      <!-- Start::row-1 -->
      <div class="row">
         <div class="col-xl-12">
            <div class="card custom-card">
               <div class="card-header">
                  <div class="card-title"> All Payment Gateway List </div>
               </div>
              <div class="card-body">
                  <div class="table-responsive">
                     <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

                      <?php 
                            if(!empty($_GET['name'])){
                                $search_name = $_GET['name']; 
                                $whereSQL1 = "AND f_name LIKE '%" . $search_name . "%'"; 
                            } 

                            if(!empty($_GET['status'])){
                                $search_status = $_GET['status']; 
                                $whereSQL2 = "AND status = $search_status"; 
                            } 

                            $sql = "select * from  tbl_payment_getway";
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
                                       <th>Payment Gateway Name</th>
                                       <th>Payment Gateway Image</th>
                                       <th>Login Id</th>
                                       <th>Transaction Key</th>
                                       <th>Client Key</th>
                                       <th>Environment</th>
                                       <th>Payment Gateway Status</th>
                                       <th>Actions</th>
                                  </tr>
                                 </thead>
                                 <tbody>
                                  <?php if(!empty($arr_users)) 
                                  { ?>
                                    <?php 
                                    $count = 0;
                                    foreach($arr_users as $user) { 
                                    ?>
                                    <tr>
                                       <td><?php print  $count+1; ?></td>
                                       <td><?php echo $user['name']; ?></td>

                                       <td><img class="thumb_image1" src="<?php echo $image_url ?>/<?php echo $user['image']  ?>"></td>
                                       
                                       <td><?php echo $user['api_login_id'] ?></td>
                                       <td><?php echo $user['transaction_key'] ?></td>
                                       <td><?php echo $user['client_key'] ?></td>
                                       <td><?php echo $user['environment'] ?></td>


                                       <td align="center" id="make_status_row_2">
                                        <?php if($user['status'] == '1'){ ?>
                                          <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=0" id="" onclick="return confirm('Are you sure change status?')"><img src="<?php echo $base_url ?>/assets/img/tick.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                        <?php } else { ?> 
                                          <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=1" class="inactive_status" onclick="return confirm('Are you sure change status?')" id=""><img src="<?php echo $base_url ?>/assets/img/erase.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                          <?php } ?>                                         
                                        </td>
                                        <td>
                                           
                                          <a href="edit.php?pid=<?php echo $user['id']; ?>"  ><i class="fa fa-edit"></i></a>&nbsp; 
                                          <!-- <a href="delete.php?pid=<?php echo $user['id']; ?>" class="delete_status" onclick="return confirm('Are you sure delete event?')"><i class="fa fa-trash"></i></a>&nbsp;  -->
                                       </td>
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
<style type="text/css">
  .thumb_image1{
    width: 150px;
  }
</style>

