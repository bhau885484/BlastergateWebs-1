<?php
   if($_COOKIE['username']){
    include("conn-web/cw.php");
   
   ?>
<?php include "header.php";  ?>
<div class="main-content side-content pt-0 span-12" >
   <div class="main-container container-fluid">
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Add Event</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Add Event</li>
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
      <div class="row">
         <div class="col-xl-12">
            <div class="card">
               <div class="card-body">
                  <form>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Enter Event Name</label>
                        <input type="text" class="form-control" placeholder="Enter event name" name="title" aria-label="name" aria-describedby="basic-addon1">
                     </div>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Enter Event Time</label>
                        <input type="date" class="form-control" placeholder="Enter event time" name="text" aria-label="name" aria-describedby="basic-addon1">
                     </div>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Enter Location</label>
                        <select class="form-select" aria-label="Default select example">
                           <option selected>Select Location</option>
                           <option value="1">Algeria</option>
                           <option value="2">Austria</option>
                           <option value="3">Belgium</option>
                        </select>
                     </div>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Image</label>
                        <input type="file" class="form-control"  name="text" aria-label="name" aria-describedby="basic-addon1">
                     </div>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Enter Price</label>
                        <input type="text" class="form-control"  name="amt" aria-label="name" aria-describedby="basic-addon1">
                     </div>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Enter Number Of Ticket</label>
                        <input type="number" class="form-control"  name="ticket" aria-label="name" aria-describedby="basic-addon1">
                     </div>
                     <div class="form-group mb-3">
                        <label id="basic-addon1">Enter Event Description </label> <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                     </div>
                     <button type="submit" class="btn btn-primary">Add Event</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<?php include "footer.php";  ?>
<?php } ?>