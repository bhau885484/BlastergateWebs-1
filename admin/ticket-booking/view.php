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
            <h2 class="main-content-title fs-24 mb-1">All Event Ticket Booking</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">All Event Ticket Booking</li>
            </ol>
         </div>
        
      </div>
      <!-- Page Header Close -->
      <!-- Start::row-1 -->
      <div class="row">
         <div class="col-xl-12">
            <div class="card custom-card">
               <div class="card-header">
                  <div class="card-title"> Ticket Booking List </div>
               </div>
               <div class="card-body">
                  <div class="table-responsive">
                     <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

                      <?php 
                           
                            if(!empty($_GET['event_id'])){
                                $event_id = $_GET['event_id']; 
                                $whereSQL1 = "AND event_id = $event_id"; 
                            } 

                            if(!empty($_GET['user_id'])){
                                $user_id = $_GET['user_id']; 
                                $whereSQL2 = "AND user_id = $user_id"; 
                            } 


                            $sql = "select * from  tbl_event_ticket_booking  WHERE 1 = 1 {$whereSQL1} {$whereSQL2}  order by created desc";
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
                                        <th>Ticket No.</th>
                                        <th>User Name</th>
                                        <th>Event Name</th>
                                        <th>Event Date</th>
                                        
                                        <th>Total Member</th>
                                        <!-- <th>Membership Discount</th> -->
                                        <th>Payment Type</th>
                                        <th>Total Amount</th>
                                        <th>Pay Amount</th>
                                        <th>Booking Date</th>
                                        <th>Action</th>                                        
                                      </tr>
                                 </thead>
                                 <tbody>
                                  <?php if(!empty($arr_users)) 
                                  { ?>
                                    <?php 
                                    $count = 0;
                                    foreach($arr_users as $user) { 
                                        
                                        $event_id = $user['id'];

                                        $event_id = $user['event_id'];
                                       
                                        $user_id = $user['user_id'];

                                        $eventdata="select * from tbl_event where id=$event_id";
                                        $gevent=mysqli_query($connect,$eventdata);
                                        $rown_event=mysqli_fetch_array($gevent);

                                        // $roomdata="select * from tbl_room where id=$room_id";
                                        // $groom=mysqli_query($connect,$roomdata);
                                        // $rown_room=mysqli_fetch_array($groom);


                                        $userdata="select * from tbl_users where id=$user_id";
                                        $guser=mysqli_query($connect,$userdata);
                                        $rown_user=mysqli_fetch_array($guser);
                                        
                                    ?>
                                    <tr>
                                      <td><?php print  $count+1; ?></td>
                                      <td><?php echo $user['serial_number'] ?></td>
                                      <td><?php echo $rown_user['username']; ?></td>
                                      <td><?php echo $rown_event['event_name'] ?></td>
                                      <td><?php echo $rown_event['event_from_date']; ?> To <?php echo $rown_event['event_to_date']; ?> <?php echo $rown_event['event_time']; ?></td>
                                      <td><?php echo $user['total_member']; ?></td>
                                      <td><?php echo $user['full_payment']; ?></td>
                                     <!--  <td> - $<?php echo $user['membership_discount']; ?></td>
                                      <td> - $<?php echo $user['primo_code_discount']; ?></td>
                                       -->
                                      <td>  $ <?php echo $user['total_amount']; ?></td>
                                      <td>  $ <?php echo $user['pay_amount']; ?></td>
                                      <td> <?php echo $user['booking_date']; ?></td>
                                      <td class="text-center">
                                        <a href="javascript:void(0)" onclick="showTicket(<?php echo $user['id']?>,<?php echo $user['user_id']?>,<?php echo $user['event_id']?>)"><i class="fa fa-eye"></i></a>&nbsp; 
                                        <!-- <a href="#" class="delete_status"><i class="fa fa-trash"></i></a>&nbsp;  -->
                                        
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

<div id="viewTicketModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-xl">
      <div class="row" id="print_invoice">
         
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

function showTicket(booking_id,user_id,event_id){

  $.ajax({
       url:"<?php echo $base_url ?>/ticket-booking/view_ticket.php",
      method:"POST",
      data:{booking_id:booking_id,user_id:user_id,event_id:event_id},
              
       success:function(data)
       {
        $('#viewTicketModal').modal('show');
        $('#print_invoice').html('');
        $('#print_invoice').html(data);
       }
      });

  

}
</script>