<?php
if($_COOKIE['username']){
	include("conn-web/cw.php");

?>
<?php include "header.php";  ?>


<div class="main-content side-content pt-0">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
            <div>
                <h2 class="main-content-title fs-24 mb-1">All Plan</h2>
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All plan</li>
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
                        <div class="card-title"> Plan List </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <div id="datatable-basic_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                                 
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table id="tblUser" class="table table-hover table-bordered">
                                          <thead>
                                            <tr>
                                                <th>S.NO.</th>
                                              <th>Plan List</th>
                                              <th>Plan Amount</th>
                                              <th>Plan Limit</th>
                                              <th>Plan Description</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            
                                              <tr>
                                                  <td>1</td>
                                                  <td>Basic</td>
                                                  <td>100$</td>
                                                  <td>30 Days</td>
                                                    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>     
                                                  <td>
                                                    <a href="#" ><i class="fa fa-edit"></i></a>&nbsp; 
                                                  </td>
                                              </tr>
                                                
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
<?php include "footer.php";  ?>
<?php } ?>