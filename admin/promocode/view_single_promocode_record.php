
<?php 
if($_COOKIE['username']){
include("../conn-web/cw.php");
include "../header.php";
?>

<div class="main-content side-content pt-0">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
            <div>
                <h2 class="main-content-title fs-24 mb-1">View Promocode Record</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Promocode Details</a></li>
                    <!-- <li class="breadcrumb-item active" aria-current="page">Navs &amp; tabs</li> -->
                </ol>
            </div>
            <div class="d-flex">
                <div class="justify-content-center">
                    <a href="<?php echo $base_url ?>/promocode/view.php" class="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"> <i class="fa fa-arrow-left  me-2 fs-14"></i> Back </a>
                </div>
            </div>
        </div>
      <?php
          $pid=$_REQUEST['id'];
          $getdata="select * from tbl_promocode where id=$pid";  
          $gdata=mysqli_query($connect,$getdata);
          $rown=mysqli_fetch_array($gdata);
          
       
         
        ?>    


        <div class="row row-sm">
            <div class="col-xl-12">
                <div class="card custom-card">
                    
                    <div class="card-body">
                      <nav class="nav nav-pills flex-column flex-sm-row" role="tablist"> 
                        <a class="flex-sm-fill text-sm-center nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#pill-flex-home" aria-selected="true">Promo Code Details</a>

                         

                      </nav>
                        <div class="tab-content">
                          <div class="tab-pane show active text-muted" id="pill-flex-home" role="tabpanel">
                              <div class="tab_content">
                                <div class="row">
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Promo Code Title :</b></span><span><?php echo $rown['promo_code']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Promo Type:</b></span><span>
                                      <?php if($rown['promo_type'] == '1'){ ?>
                                          Percentage
                                      <?php } else {  ?>
                                       Fixed
                                       <?php } ?>
                                    </span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Discount Value :</b></span><span>
                                      <?php if($rown['promo_type'] == '1'){ 
                                       
                                        echo $rown['promo_price'].'%';
                                       } else { 
                                       echo '$'.$rown['promo_price'];
                                       } ?>


                                     </span> </p>
                                  </div>

                                  
                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>User Limit:</b></span><span><?php echo $rown['user_limit']?></span> </p>
                                  </div>

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Promo Code From Date:</b></span><span><?php echo $rown['start_date']?></span> </p>
                                  </div>

                                  

                                  <div class="col-md-4">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Promo Code To Date:</b></span><span><?php echo $rown['end_date']?></span> </p>
                                  </div>

                                  
                                  <div class="col-md-12">
                                    <p class="text-muted ms-0 mb-3"><span class="font-weight-semibold me-2"><b>Description:</b></span><span><?php echo $rown['description']?></span> </p>
                                  </div>

                                  


                                  
                                </div>
                                <hr>
                                
                              </div>
                          </div> 

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End:: row-13 -->
    </div>
</div>



<?php include "../footer.php";  ?>
<?php } ?>
<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<script>
jQuery(document).ready(function($) {
    $('#tblUser').DataTable({
      "pageLength": 25
      });
});
</script>