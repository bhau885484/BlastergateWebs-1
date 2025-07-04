<?php

include("../conn-web/cw.php");


$event_id = $_POST['event_id'];


$get_product="select * from tbl_notification where event_id=$event_id";  
$results_user=mysqli_query($connect,$get_product);


$output = '<label class="control-label" for="focusedInput">Select Users</label>
                    <div class="controls">
                        <select  name = "user[]" multiple  id="rider_list_dropdown" class="form-control" id="user_id" required="required" >';

foreach ($results_user as $user){

	$user_id = $user['user_id'];

	$getdata="select * from tbl_users where id=$user_id";  
	$gdata=mysqli_query($connect,$getdata);
	$single_data=mysqli_fetch_array($gdata);


	$output .= ' <option value="'.$single_data['id'].'" >'.$single_data['username'].'</option>';

}
$output .= '</select></div>';

echo $output;


?>

<script type="text/javascript">
    $("#rider_list_dropdown").multipleSelect({
      filter: true,
      multiple: true,
      multipleWidth: 600,
      
      within: window,
      onCheckAll: function () {

             var vall=$('#rider_list_dropdown').multipleSelect('getSelects');
             
             $('#useraarray').val("");
             $('#useraarray').val(vall);

         },

        onUncheckAll: function () {

             $('#useraarray').val("");

        },

        onClick: function () {

             var vall=$('#rider_list_dropdown').multipleSelect('getSelects');
             
             $('#useraarray').val("");
             $('#useraarray').val(vall);

        },
    });
</script>
