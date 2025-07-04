
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
                <h2 class="main-content-title fs-24 mb-1">All feedback</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Feedback</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Feedback</li>
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
                        <div class="card-title"> Feedback List </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               
                                <?php 

                                  // echo $_GET['name'];

                                     
                                     $sql = "select * from  tbl_feedback order by id desc";
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
                                              <th>Feedback</th>
                                              <th>Dated</th>
                                              <th>&nbsp;</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <?php if(!empty($arr_users)) 
                                            { ?>
                                              <?php 
                                              $count = 0;
                                              foreach($arr_users as $user) { 

                                                $user_id = $user['user_id'];

                                                $getdata_users="select * from tbl_users where id=$user_id";  
                                                $gdata_users=mysqli_query($connect,$getdata_users);
                                                $user_data=mysqli_fetch_array($gdata_users);


                                                ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td><?php echo $user_data['username']; ?></td>
                                                  <td><?php echo $user['feedback']; ?></td>
                                                  

                                                  <td><?php echo date("d M Y", strtotime($user['created'])); ?></td>
                                                  <td>

                                                   
                                                    <a href="delete.php?pid=<?php echo $user['id']; ?>" class="delete_status" onclick="return confirm('Are you sure delete product?')" ><i class="fa fa-trash"></i></a>&nbsp;
                                                    
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
