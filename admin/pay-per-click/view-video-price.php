
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
                <h2 class="main-content-title fs-24 mb-1">Chocolate Factory Video Price</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Users</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Video Price</li>
                </ol>
            </div>
           
        </div>
        <!-- Page Header Close -->
        
        <!-- Start::row-1 -->
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="card-title">Chocolate Factory Video Price </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                               
                                <?php 

                                 

                                      $sql = "select * from  tbl_pay_per_click_video_price  order by id asc";
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
                                              <th>Title</th>
                                              <th>Price</th>
                                             
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
 
                                               ?>
                                              <tr>
                                                  <td><?php print  $count+1; ?></td>
                                                  <td> <?php echo $user['title']; ?></td>
                                                  <td>$<?php echo $user['price']; ?></td>
                                                  
                                                  <td>
                                                    <a href="edit-video-price.php?pid=<?php print $user['id']?>"><i class="fa fa-pencil-square-o"></i></a>&nbsp;
                                                    
                                                    
                                                   <!--  <a href="view_couple_record.php?pid=<?php print $user['id']?>"><i class="fa fa-eye"></i></a>&nbsp; 
                                                   
                                                    
                                                    
                                                    <a href="delete.php?pid=<?php echo $user['id']; ?>" class="delete_status" onclick="return confirm('Are you sure delete product?')" ><i class="fa fa-trash"></i></a>&nbsp; -->
                                                    
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
