<?php 
include("../conn-web/cw.php");
 
?> 
<?php include "../header.php";  ?>
<div class="main-content side-content pt-0">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
            <div>
                <h2 class="main-content-title fs-24 mb-1">All User List</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All List</li>
                </ol>
            </div>
             <div class="d-flex">
                <div class="justify-content-center">
                    <a href="<?php echo $base_url ?>/promocode/view.php" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
          
        </div>
        <!-- Page Header Close -->
        
        <!-- Start::row-1 -->
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title"> List </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               <?php
                                $promocode_id=$_REQUEST['id'];
                                $sql = "select * from  tbl_event_ticket_booking  WHERE promo_code_id='$promocode_id'";
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
                                              <th>User Name</th>
                                              <th>Event Name</th>
                                              <th>Rooms Name</th>
                                              <th>Event Price</th>
                                              <th>Promo Code Discount</th>
                                              <th>Room Amount</th>
                                              <th>Total Amount</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <?php if(!empty($arr_users)) 
                                            { ?>
                                              <?php 
                                              $count = 0;
                                              foreach($arr_users as $user) { 
                                                  
                                                $event_id = $user['event_id'];
                                                $room_id = $user['room_id'];

                                                $eventdata="select * from tbl_event where id=$event_id";
                                                $gevent=mysqli_query($connect,$eventdata);
                                                $rown_event=mysqli_fetch_array($gevent);

                                                $roomdata="select * from tbl_room where id=$room_id";
                                                $groom=mysqli_query($connect,$roomdata);
                                                $rown_room=mysqli_fetch_array($groom);
                                                  
                                              ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td><a href="view_single_record.php?id=<?php echo $user['id']; ?>&back_id=<?php echo $event_id ?>"><?php echo $user['f_name_member_1']; ?>&nbsp;<?php echo $user['l_name_member_1']; ?></a></td>

                                                  <td><?php echo $rown_event['event_name'] ?></td>
                                                  <td><?php echo $rown_room['room_name'] ?></td>
                                                  <td>$<?php echo $user['sub_total']; ?></td>
                                                  <td> - $<?php echo $user['discount_price']; ?></td>
                                                  <td> + $<?php echo $user['room_price']; ?></td>
                                                  <td>  $<?php echo $user['final_amount']; ?></td>
                                                  
                                                  <!-- <td class="text-center">
                                                    <a href="#" ><i class="fa fa-edit"></i></a>&nbsp; 
                                                    <a href="#" class="delete_status"><i class="fa fa-trash"></i></a>&nbsp; 
                                                    
                                                  </td> -->
                                              </tr>
                                               <?php $count++; } ?>
                                              <?php }  ?>    
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

<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<script>
jQuery(document).ready(function($) {
    $('#tblUser').DataTable({
      "pageLength": 25
      });
});
</script>