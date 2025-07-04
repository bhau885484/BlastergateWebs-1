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
            <h2 class="main-content-title fs-24 mb-1">Payment Gateway List Management</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">All Payment Gateway List</li>
            </ol>
         </div>
         <!-- <div class="d-flex">
            <div class="justify-content-center">
               <a href="<?php echo $base_url ?>/membership.php" class="btn btn-primary btn-icon-text my-2 me-2 d-inline-flex align-items-center"> <i class="fe fe-plus me-2 fs-14"></i> Add Membership </a>
            </div>
         </div> -->
      </div>
      <!-- Page Header Close -->
      <!-- Start::row-1 -->
      <div class="row">
         <div class="col-xl-12">
            <div class="card custom-card">
               <div class="card-header">
                  <div class="card-title">Payment Gateway List</div>
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
                                       <th>Payment Gateway Name</th>
                                       <th>Payment Gateway Subtitle</th>
                                       <th>Payment Gateway Image</th>
                                       <th>Payment Gateway Status</th>
                                       <th>Show On Wallet?</th>
                                       <th>Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>1</td>
                                       <td>Razorpay</td>
                                       <td>Card, UPI, Net banking, Wallet(Phone Pe, Amazon Pay, Freecharge)</td>
                                       <td><img src="assets/img/payment-gatway/razorpay.png"></td>
                                       <td><a href="#" class="btn btn-soft-primary" >Publish</a>&nbsp; </td>
                                       <td><a href="#" class="btn btn-soft-primary" >Publish</a>&nbsp; </td>
                                       <td class="text-center">
                                          <a href="<?php echo $base_url ?>/edit-payment.php" ><i class="fa fa-edit"></i></a>&nbsp; 
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