<?php
   if($_COOKIE['username']){
    include("conn-web/cw.php");
   
   ?>
<?php include "header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Promo Code Management</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Promo Code</li>
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
                        <!-- <div class="form-group mb-3">
                           <label id="basic-addon1">Select Image</label>
                           
                           <input type="file" class="form-control" name="title" aria-label="Username" aria-describedby="basic-addon1">
                           
                           </div> -->
                        <!-- <div class="justify-content-center mb-3">
                           <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                           <label class="form-check-label" for="inlineRadio1">Discount</label>
                           </div>
                           <div class="form-check form-check-inline">
                           <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                           <label class="form-check-label" for="inlineRadio2">Free Days</label>
                           </div>
                           </div> -->
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Promo Code</label>
                           <input type="text" class="form-control" name="code">
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Promo Type</label>
                           <select class="form-select" aria-label="Default select example">
                              <option selected>Select Type</option>
                              <option value="1">Percentage</option>
                              <option value="2">Fixed Amount</option>
                           </select>
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Discount Value</label>
                           <input type="text" class="form-control" name="discount">
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">User Limit</label>
                           <input type="text" class="form-control" name="user" placeholder="1-100 User">
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Description</label>
                           <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="form-group mb-3">
                           <label id="basic-addon1">Promo Code Date</label>
                           <input class="form-control" type="text" name="daterange" value="16/05/2023 - 15/06/2023">
                        </div>
                        <button type="submit" class="btn btn-primary">Add Promo Code</button>
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