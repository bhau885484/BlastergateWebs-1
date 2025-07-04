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
            <h2 class="main-content-title fs-24 mb-1">Upcoming Event</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Upcoming Event</li>
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
                  <div class="card-title">Upcoming Events List</div>
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
                                       <th>Event name</th>
                                       <th>Event time</th>
                                       <th>Description</th>
                                       <th>Image</th>
                                       <th>Price</th>
                                       <th>Ticket</th>
                                       <th>Status</th>
                                       <th>&nbsp;</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>1</td>
                                       <td>xyz</td>
                                       <td>29/04/2024 11:04:00</td>
                                       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                       <td>
                                          <img alt="avatar" src="http://localhost/blaster-gate-admin//assets/img/users/1.jpg">
                                       </td>
                                       <td>222</td>
                                       <td>300</td>
                                       <td style=";font-weight: bold;cursor: pointer;" class="text-primary">Upcoming</td>
                                       <td>
                                          <a href="#" ><i class="fa fa-eye"></i></a>&nbsp; 
                                          <a href="#" ><i class="fa fa-edit"></i></a>&nbsp; 
                                          <a href="#" class="delete_status"><i class="fa fa-trash"></i></a>&nbsp; 
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