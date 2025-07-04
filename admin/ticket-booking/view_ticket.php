<?php

include("../conn-web/cw.php");


$booking_id = $_POST['booking_id'];
$user_id = $_POST['user_id'];
$event_id = $_POST['event_id'];


$get_booking="select * from tbl_event_ticket_booking where id=$booking_id";  
$results_booking=mysqli_query($connect,$get_booking);
$rown_booking=mysqli_fetch_array($results_booking);
// print_r($rown_booking);


$get_users="select * from tbl_users where id=$user_id";  
$results_users=mysqli_query($connect,$get_users);
$rown_users=mysqli_fetch_array($results_users);


$get_event="select * from tbl_event where id=$event_id";  
$results_event=mysqli_query($connect,$get_event);
$rown_event=mysqli_fetch_array($results_event);

$get_additional_night="select * from tbl_event_ticket_bookig_additional_night where event_id=$event_id and user_id=$user_id";  
$results_additional_night=mysqli_query($connect,$get_additional_night);
// $rown_additional_night=mysqli_fetch_array($results_additional_night);


$get_room_list="select * from tbl_event_ticket_bookig_room_list where event_id=$event_id and user_id=$user_id";  
$results_room_list=mysqli_query($connect,$get_room_list);
// $rown_room_list=mysqli_fetch_array($results_room_list);

// print_r($rown_room_list);


$get_room_user_list="select * from tbl_event_ticket_bookig_room_user_list where event_id=$event_id and user_id=$user_id";  
$results_room_user_list=mysqli_query($connect,$get_room_user_list);


// $rown_room_user_list=mysqli_fetch_array($results_room_user_list);


$get_user_list="select * from tbl_event_ticket_bookig_user_list where event_id=$event_id and user_id=$user_id";  
$results_user_list=mysqli_query($connect,$get_user_list);
// $rown_user_list=mysqli_fetch_array($results_user_list);


$get_partial_payment="select * from tbl_event_ticket_booking_partial_payment where event_id=$event_id and user_id=$user_id";  
$results_partial_payment=mysqli_query($connect,$get_partial_payment);
// $rown_partial_payment=mysqli_fetch_array($results_partial_payment);



$day_from = date('D', strtotime($rown_event['event_from_date']));
$day_to = date('D', strtotime($rown_event['event_to_date']));


$date_from = date('w', strtotime($rown_event['event_from_date']));
$date_to = date('w', strtotime($rown_event['event_to_date']));


$date_from = date('d', strtotime($rown_event['event_from_date'])); 
$month_from = date('M', strtotime($rown_event['event_from_date'])); 
$year_from = date('Y', strtotime($rown_event['event_from_date'])); 


$date_to = date('d', strtotime($rown_event['event_to_date'])); 
$month_to = date('M', strtotime($rown_event['event_to_date'])); 
$year_to = date('Y', strtotime($rown_event['event_to_date'])); 
// print_r($rown_event['event_name']);

$event_time = date('h:i A', strtotime($rown_event['event_time']));


// $get_room_user_list="select SUM(amount) from tbl_event_ticket_bookig_room_user_list where event_id=$event_id and user_id=$user_id";  
// $results_room_user_list=mysqli_query($connect,$get_room_user_list);


$output = '<div class="row" id="print_invoice">
         <div class="col-lg-12 col-md-12 mx-auto bg-black p-3" >
            <div class="modal-content py-3 " style="background-image: url(assets/img/ticket.jpeg );    background-size: cover;box-shadow: 0 0 10px #000;">
               <div class="modal-header justify-content-between">
                  <img src="'.$base_url.'/assets/img/logo.png" class="img-fluid" width="100">
                  <h2 class="text-orange text-center fw-bold " style="font-family: cursive; ">'.$rown_event['event_name'].'</h2>


                  <a href="javascript:void(0)"  (click)="print()" class="btn btn-sm btn-outline-maroon bg-maroon  text-center text-white "><i class="bi bi-printer me-1"></i>Print</a>


                  <button type="button" class="btn-close text-white m-0" data-bs-dismiss="modal" aria-label="Close" style="background-color: transparent;
                     border: 0;"></button>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class=" col-lg-8 col-md-8 col-sm-8 col-8 border-end">
                        <h5 class="fs-5 text-center text-orange mb-0 mb-3" style="font-family:cursive;">'.$day_from.' - '.$day_to.' , '.$month_from.' '.$date_from.' '.' - ' .' '.$month_to.' '.$date_to.' , '.$year_from.' '.$event_time.'
                        </h5>
                        <div class="row " style="font-family: monospace;">
                          
                           <div class="col-lg-12 col-md-12 col-sm-12 col-12  ">
                            
                              <h4>Booking Room Details</h4>
                              <hr>
                              <div class="mt-3 table-responsive">
                                <table class="table border">
                                    <thead>
                                        <tr class="border-bottom">
                                            <th class="text-black">Qty</th>
                                            <th class="text-black">Item</th>
                                            <th class="text-black">Price</th>
                                           <th class="text-black">Fee</th>
                                           <th class="text-black">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>';
                                     while($info_room_array = mysqli_fetch_assoc($results_room_list))  { 
                                       $total_room_price += $info_room_array['amount'];
                                      $output .= '<tr class="border-bottom">
                                            <td class="text-black">
                                               '.$info_room_array['qty'].'
                                            </td>
                                            <td class="text-black">
                                                <div class="d-flex">
                                                    <div class="me-2"><img src="'.$info_room_array['room_image'].'" class="img-fluid" style="width: 150px;height: 100px" /></div>
                                                    <div>
                                                        <b>'.$info_room_array['room_name'].'</b>
                                                    </div>
                                                </div>
                                                <h5 class="mb-2 mt-3">Event Member</h5>
                                                <div class="">
                                                    <table class="table table-bordered">
                                                        <thead>
                                                            <tr class="border-bottom">
                                                                <th class="text-black">Full Name</th>
                                                                <th class="text-black">User Name</th>
                                                                <th class="text-black">Email</th>
                                                                <th class="text-black">Phone Number</th>
                                                                <th class="text-black">Id Proof</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>';
                                                          while($info_add_room_user_list = mysqli_fetch_assoc($results_room_user_list))  {


                                                     $output .= '<tr class="border-bottom">';
                                                          
                                                          if($info_add_room_user_list['room_id'] == $info_room_array['room_id']){    
                                                             $output .= '
                                                                <td class="text-black">
                                                                    <p>'.$info_add_room_user_list['full_name'].'</p>
                                                                </td>
                                                                <td class="text-black">'.$info_add_room_user_list['username'].'</td>
                                                                <td class="text-black">'.$info_add_room_user_list['email'].'</td>
                                                                <td class="text-black">'.$info_add_room_user_list['mobile'].'</td>
                                                                <td class="text-black"><img class="img_pay_proof" src="'.$image_url.'/'.$info_add_room_user_list['id_proof'].'" style="width: 50px;"/></td>';
                                                              }
                                                             $output .= '</tr>';
                                                          }
                            
                                                        $output .= '</tbody>
                                                    </table>
                                                </div>
                                            </td>
                                            <td class="text-black">'.$info_room_array['price'].'</td>
                                            <td class="text-black">'.$info_room_array['fee'].'</td>
                                            <td class="text-black">'.$info_room_array['amount'].'</td>
                                        </tr>';
                                         }
                                        
                      $output .= '</tbody>
                                </table>
                              </div>
                              <h4>Room Additional Night Details</h4>
                              <hr>
                              <div class="mt-3 mb-4 table-responsive">
                                <table class="border table ">
                                  <thead>
                                     <tr class="border-bottom">
                                        <th class="text-black" style="width: 225px;">Qty</th>
                                        <th class="text-black" style="width: 800px;">Item</th>
                                        <th class="text-black">Price</th>
                                        <th class="text-black">Fee</th>
                                        <th class="text-black" style="text-align: right;">Amount</th>
                                     </tr>
                                  </thead>
                                  <tbody>';
                                  while($info_additional_night = mysqli_fetch_assoc($results_additional_night))  
                                  { 
                                    $total_additional_night_price += $info_additional_night['amount'];
                                   $output .= '<tr class="border-bottom">
                                        <td>
                                           <p class="me-2 me-2 text-black">
                                              '.$info_additional_night['qty'].'</p>
                                        </td>
                                        <td class="text-black">
                                           <p class="text-orange">
                                              '.$info_additional_night['day'].'</p>
                                        </td >
                                        <td class="text-black">'.$info_additional_night['price'].'</td>
                                        <td class="text-black">'.$info_additional_night['fee'].'</td >
                                        <td class="text-black" style="text-align: right;">'.$info_additional_night['amount'].'</td>
                                    </tr>';
                                  }
                                $output .= '</tbody>
                                </table>
                              </div>

                              
                              
                           </div>
                           
                           <hr>

                        </div>
                     </div> 
                     <div class=" col-lg-4 col-md-4 col-sm-4 col-4 mb-3 text-center justify-content-between">
                        <img src="'.$image_url.'/'.$rown_event['event_image'].'" class="img-fluid event_boking_img mb-5"  style="width: 200px;" >

                        <img src="'.$qr_url.'/'.$rown_booking['qr_image'].'" class="img-fluid pb-2" style="width: 200px;" >
                        <p class="mb-0 pb-1 text-muted">'.$rown_booking['serial_number'].'</p>

                        <hr>

                        <p class="mb-0 pb-2 text-black" style="font-weight: bold;font-size: 16px;text-align: left;"> Payment Type : '.$rown_booking['full_payment'].'</p>';

                         if($rown_booking['full_payment'] == 'Partial Payment'){   
                          $output .= ' <div class="mt-3 mb-4 table-responsive">
                          <table class="border table ">
                            <thead>
                               <tr class="border-bottom">
                                  <th class="text-black" style="width: 225px;">Amount</th>
                                  <th class="text-black" style="width: 800px;">Date</th>
                                 
                               </tr>
                            </thead>
                            <tbody>';
                            while($booking_partial_payment = mysqli_fetch_assoc($results_partial_payment))  { 
                            $output .= '
                               <tr class="border-bottom">
                                 <td class="text-black">'.$booking_partial_payment['amount'].'</td>
                                 <td class="text-black">'.$booking_partial_payment['created'].'</td>
                               </tr>';
                             }
                            $output .= ' 
                            </tbody>
                          </table>
                        </div';
                       }
                      $output .= '<hr>

                       <table class="table table-bordered">';

                        $final_sub_total = $total_room_price+$total_additional_night_price;
                        $final_total1 = $rown_booking['membership_discount']+$rown_booking['primo_code_discount'];

                        $final_total =  $final_sub_total-$final_total1;

                        $remaining_amount =  $rown_booking['total_amount']-$rown_booking['pay_amount'];

                        

                          
                          $output .= '<tbody>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Total Memeber</b></td>
                                  <td class="text-black">'.$rown_booking['total_member'].'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Total Room Price</b></td>
                                  <td class="text-black">$ '.$total_room_price.'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Total Additional Night Price</b></td>
                                  <td class="text-black">$ '.$total_additional_night_price.'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Sub Total</b></td>
                                  <td class="text-black">$ '.$final_sub_total.'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b style="color: red">Membership Discount</b></td>
                                  <td class="text-black"> - $ '.$rown_booking['membership_discount'].'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b style="color: red">Promo Discount </b></td>
                                  <td class="text-black"> - $ '.$rown_booking['primo_code_discount'].'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Total Amount</b></td>
                                  <td class="text-black">$ '.$rown_booking['total_amount'].'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Pay Amount</b></td>
                                  <td class="text-black">$ '.$rown_booking['pay_amount'].'</td>
                               </tr>
                               <tr class="border-bottom" style="font-size: 13px;">
                                  <td class="text-black"><b>Remaining a Amount</b></td>
                                  <td class="text-black">$ '.$remaining_amount.'</td>
                               </tr>
                            </tbody>
                          </table>

                        
                       
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>';

echo $output;


?>