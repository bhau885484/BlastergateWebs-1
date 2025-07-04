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
            <h2 class="main-content-title fs-24 mb-1">All Event</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">All Event</li>
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
                  <div class="card-title"> Event List </div>
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

                            $sql = "select * from  tbl_event  WHERE 1 = 1 {$whereSQL1} {$whereSQL2} order by created desc";
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
                                       <th>Image</th>
                                       <th>Event Name</th>
                                       <th>Event Type</th>
                                       <th>Event Target Audience</th>
                                       <th>Event Date / Time</th>
                                       <!-- <th>Location</th> -->
                                       <th>Price</th>
                                       <th>No. Of Ticket</th>
                                       <th>Join User Count</th>
                                       <th>Additional Room Night Price</th>
                                       <th>Additional Room Night Fee</th>
                                       <th>Additional Room Night Days</th>
                                       <th>Status</th>
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

                                        $getdata="select * from tbl_event_ticket_booking where event_id=$event_id";  
                                        $gdata=mysqli_query($connect,$getdata);
                                        $user_count=mysqli_num_rows($gdata);
                                        
                                    ?>
                                    <tr>
                                       <td><?php print  $count+1; ?></td>
                                       <td><img class="thumb_image" src="<?php echo $image_url ?>/<?php echo $user['event_image']  ?>"></td>
                                       <td><a href="<?php echo $base_url ?>/event/view_single_event_record.php?id=<?php echo $user['id']  ?>" style="cursor:pointer;font-weight: bold;"><?php echo $user['event_name']; ?></a></td>
                                       <td>
                                        <?php if($user['event_type'] == 'private'){ ?>
                                          Private
                                        <?php }else{ ?>  
                                          Public
                                        <?php } ?>  
                                      </td>

                                      <td style="overflow: scroll;">
                                      <?php if($user['couple_male_female_swingers'] == '1'){ ?>
                                       <img src="<?php echo $base_url ?>/assets/img/icon/female-male.png" class="img-fluid wh-20 me-2" >
                                     <?php } ?>
                                     <?php if($user['couple_female_female_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/female-female.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_female_female_swingers == '1'">
                                     <?php } ?>   
                                    <?php if($user['couple_male_male_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/male-male.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_male_male_swingers == '1'">
                                    <?php } ?>   
                                    <?php if($user['couple_male_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/male.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_male_swingers == '1'">
                                    <?php } ?>    
                                    <?php if($user['couple_female_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/female.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_female_swingers == '1'">
                                    <?php } ?>    
                                    <?php if($user['couple_transgender_swingers'] == '1'){ ?>
                                        <img src="<?php echo $base_url ?>/assets/img/icon/transgender.png" class="img-fluid wh-20 me-2" *ngIf="profileData.couple_transgender_swingers == '1'">  

                                    <?php } ?>    
                                      </td>

                                       
                                       <td><?php echo $user['event_from_date']; ?> - <?php echo $user['event_from_time']; ?> To <?php echo $user['event_to_date']; ?> - <?php echo $user['event_to_time']; ?></td>
                                       <!-- <td><?php echo $user['formatted_address']; ?></td> -->
                                       
                                       <td>$<?php echo $user['event_price']; ?></td>
                                       <td><?php echo $user['event_no_of_ticket']; ?></td>
                                      
                                       <td><a href="<?php echo $base_url ?>/ticket-booking/view.php?event_id=<?php echo $event_id ?>" title="view User List"><?php echo $user_count; ?></a></td>
                                       <td>$<?php echo $user['additional_room_night_price']; ?></td>
                                       <td>$<?php echo $user['additional_room_night_fee']; ?></td>
                                       <td><?php echo $user['additional_room_night_days']; ?></td>


                                       <td align="center" id="make_status_row_2">
                                        <?php if($user['status'] == '1'){ ?>
                                          <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=0" id="" onclick="return confirm('Are you sure change status?')"><img src="<?php echo $base_url ?>/assets/img/tick.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                        <?php } else { ?> 
                                          <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=1" class="inactive_status" onclick="return confirm('Are you sure change status?')" id=""><img src="<?php echo $base_url ?>/assets/img/erase.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                                  <?php } ?>                                         
                                        </td>
                                        <td>
                                         <!--  <a href="<?php echo $base_url ?>/event/view_record.php?id=<?php echo $user['id']; ?>" title="view User List"><i class="fa fa-eye"></i></a> -->
                                          &nbsp; 
                                          <a href="edit.php?pid=<?php echo $user['id']; ?>"  ><i class="fa fa-edit"></i></a>&nbsp; 
                                          <a href="delete.php?pid=<?php echo $user['id']; ?>" class="delete_status" onclick="return confirm('Are you sure delete event?')"><i class="fa fa-trash"></i></a>&nbsp; 
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