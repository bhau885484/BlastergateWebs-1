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
            <h2 class="main-content-title fs-24 mb-1">All Event Notification</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
               <li class="breadcrumb-item active" aria-current="page">All Event Notification</li>
            </ol>
         </div>
          <div class="d-flex">
            <div class="justify-content-center">
                <a type="button" class="btn btn-white btn-icon-text my-2 me-2 d-inline-flex align-items-center" href="<?php echo $base_url ?>/event-notification/send.php"> <i class="fe fe-plus me-2 fs-14"></i> Send Notification </a>
                
            </div>
            </div>
      </div>
      <!-- Page Header Close -->
      <!-- Start::row-1 -->
      <div class="row">
         <div class="col-xl-12">
            <div class="card custom-card">
               <div class="card-header">
                  <div class="card-title"> Event Notification List </div>
               </div>
               <div class="card-body">
                  <div class="table-responsive">
                     <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">

                      <?php 
                            

                            $sql = "select * from  tbl_notification  WHERE type='event'";
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
                                        <th>Video</th>
                                       <th>Event Name</th>
                                       <th>Users</th>
                                       <th>Title</th>
                                       <th>Send Date</th>
                                       <th>Content</th>
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
                                      $event_id = $user['event_id'];
                                      $user_id = $user['user_id'];

                                      $eventdata="select * from tbl_event where id=$event_id";
                                      $gevent=mysqli_query($connect,$eventdata);
                                      $rown_event=mysqli_fetch_array($gevent);

                                      $userList = explode(',', $user['user_id']); 

                                      // print_r($userList);


                                      // $userdata="select * from tbl_users where id=$user_id";
                                      // $guser=mysqli_query($connect,$userdata);
                                      // $rown_user=mysqli_fetch_array($guser);

                                      
                                      
                                        
                                    ?>
                                    <tr>
                                       <td><?php print  $count+1; ?></td>
                                       <td>
                                        <?php if($user['image']){ ?>
                                        <img class="thumb_image" src="<?php echo $image_url ?>/<?php echo $user['image']  ?>">
                                      <?php } else{ ?>
                                        <img class="thumb_image" src="<?php echo $image_url ?>/dummy_image.png">
                                      <?php } ?>
                                      </td>
                                      <td>
                                        <?php if($user['video']){ ?>

                                        <video height="100" width="200" controls class="rounded-bottom-5 ">
                                          <source src="<?php echo $image_url ?>/<?php echo $user['video']  ?>" >
                                        </video>
                                      <?php } else{ ?>
                                        <img class="thumb_image" src="<?php echo $image_url ?>/dummy_image.png">
                                      <?php } ?>
                                      </td>
                                       <td><?php echo $rown_event['event_name']; ?></td>
                                        <td><?php  
                                          foreach ($userList as $newuser) {
                                      // echo $newuser;
                                         $userdata1="select * from tbl_users where id='$newuser'";
                                          $guser1=mysqli_query($connect,$userdata1);
                                          $rown_user1=mysqli_fetch_array($guser1);
                                          $newUserList = $rown_user1['username'];
                                          ?>
                                          <span style="background: #381522;color: #fff;padding: 3px 6px 4px 6px;border-radius: 3px;font-size: 12px;margin-bottom: 10px;"><?php echo  $newUserList ?></span>
                                        <?php } ?></td>
                                       
                                       <td><?php echo $user['title'] ?></td>
                                       <td><?php echo $user['created'] ?>,
                                       <?php 
                                          $date = $user['time']; 
                                          echo date('h:i:s a', strtotime($date));
                                       ?>


                                       </td>
                                       <td><?php echo $user['description']; ?></td>
                                       <td>Send</td>
                                      
                                       <!-- <td align="center" id="make_status_row_2">
                                        <?php if($user['status'] == '1'){ ?>
                                          <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=0" id="" onclick="return confirm('Are you sure change status?')"><img src="<?php echo $base_url ?>/assets/img/tick.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                        <?php } else { ?> 
                                          <a href="change_status.php?pid=<?php echo $user['id']; ?>&status=1" class="inactive_status" onclick="return confirm('Are you sure change status?')" id=""><img src="<?php echo $base_url ?>/assets/img/erase.png" width="16" height="16" alt="Click to unblock" title="Click to unblock"></a>
                                                  <?php } ?>                                         
                                        </td> -->
                                        <td>
                                          <!-- <a href="<?php echo $base_url ?>/event/view_record.php?id=<?php echo $user['id']; ?>" title="view User List"><i class="fa fa-eye"></i></a>
                                          &nbsp; 
                                          <a href="edit.php?pid=<?php echo $user['id']; ?>"  ><i class="fa fa-edit"></i></a>&nbsp;  -->
                                          <a href="delete.php?pid=<?php echo $user['id']; ?>" class="delete_status" onclick="return confirm('Are you sure delete product?')"><i class="fa fa-trash"></i></a>&nbsp; 
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