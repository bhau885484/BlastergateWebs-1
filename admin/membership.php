<?php
   if($_COOKIE['username']){
    include("conn-web/cw.php");
   
   ?>
<?php include "header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Membership Management</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Membership Management</li>
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
      <div class="inner-body">
         <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-body">
                     <form>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Plan Name</label>
                           <input type="text" class="form-control" name="planName">
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Duration (Months)</label>
                           <input type="number" class="form-control" name="duration">
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Price</label>
                           <input type="number" class="form-control" name="price">
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Benefits</label>
                           <textarea class="form-control" id="benefits" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Plan</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<?php include "footer.php";  ?>
<?php } ?>