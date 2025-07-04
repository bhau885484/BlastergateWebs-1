<?php 
include("../conn-web/cw.php");
  if(!$_SESSION["tata_login_username"]){
  header('Location:index.php'); 
}
?>
<?php include "../header.php";  ?>
  <div class="span9" id="content">
    <div class="row-fluid">
      <div class="navbar">
        <div class="navbar-inner">
          <ul class="breadcrumb">
            <i class="fa fa-angle-left hide-sidebar"><a href="#" title="Hide Sidebar" rel="tooltip">&nbsp;</a></i>
            <i class="fa fa-angle-right show-sidebar" style="display:none;"><a href="#" title="Show Sidebar" rel="tooltip">&nbsp;</a></i><li><a href="<?php echo $base_url ?>/dashboard.php">Dashboard</a> <span class="divider">/</span></li><li><a href="#">Users</a> <span class="divider">/</span></li><li class="active">Add User</li>
          </ul>
        </div>
      </div>
    </div>
  
    <div class="row-fluid">
    <!-- block -->
    <div class="block">
      <div class="navbar navbar-inner block-header">
        <div class="muted pull-left">Add New User</div>
      </div>
      <div class="block-content collapse in">
        <div class="span12">
           <?php
                if(isset($_SESSION['success'])){
                    echo('<p style="color:green">'.$_SESSION['success']."</p>");
                    unset($_SESSION['success']);
                }
                if(isset($_SESSION['error'])){
                    echo('<p style="color:red">'.$_SESSION['error']."</p>");
                    unset($_SESSION['error']);
                }
            ?>
                    
            <form  id="add_form" name="add_form" class="form-horizontal" method="post" action="save.php" enctype="multipart/form-data">
            <fieldset>              
              <div class="control-group">
                <label class="control-label" for="focusedInput">First Name*</label>
                <div class="controls">
                  <input type="text" name="f_name" class="input-xlarge focused" placeholder="First Name" id="f_name" required="required" value="<?php echo $_POST['f_name'];?>">
                  <div id="f_name_error" class="error_msg"></div>
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="focusedInput">Last Name*</label>
                <div class="controls">
                  <input type="text" name="l_name" class="input-xlarge focused" placeholder="Last Name" id="l_name" required="required">
                  <div id="l_name_error" class="error_msg"></div>
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="focusedInput">Email*</label>
                <div class="controls">
                  <input type="email" name="email" class="input-xlarge focused" placeholder="Email" id="email" required="required">
                  <div id="email_error" class="error_msg"></div>
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="focusedInput">Phone Number*</label>
                <div class="controls">
                  <select  name="country_mobile_code" class="form-control" id="country_mobile_code" required="required" onchange="disableaddress()" style="width: 65px">
                    <option value="+65">+65</option> 
                    <?php 
                    $query="SELECT * FROM tbl_countries WHERE status=1";
                    $results = mysqli_query($connect, $query);
                    foreach ($results as $country_list){
                    ?>
                    <option value="<?php echo $country_list["country_mobile_code"];?>"><?php echo $country_list["country_mobile_code"];?></option> 
                    <?php } ?>
                  </select>
                  <input type="tel" name="phone" class="input-xlarge focused" placeholder="Phone Number" id="phone" required="required">
                  <div id="phone_error" class="error_msg"></div>
                </div>
              </div>
              <div class="control-group">
                <label class="control-label" for="focusedInput">Password*</label>
                <div class="controls">
                  <input type="password" name="password" class="input-xlarge focused" placeholder="Password" id="password" required="required">
                  <div id="password_error" class="error_msg"></div>
                </div>
              </div>
              <div class="form-actions">
                <input type="button" name="add_makes" value="Add" class="btn btn-primary" onclick="submitDetailsForm()">
                <a class="btn" href="#">Cancel</a>
              </div>
            </fieldset>
          </form>   
        </div>
      </div>
    </div>
    <!-- /block -->
    </div>
  
</div>

</div>
</div>
  
<?php include "../footer.php";  ?>


<script language="javascript" type="text/javascript">
    function submitDetailsForm() {

      var error = 1;
      var f_name = $("#f_name").val();
      var l_name = $("#l_name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var password = $("#password").val();
     
      var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

      if((f_name == '') || (f_name == undefined)){
        $("#f_name_error").text("This field are required");
        error = 0;
      }else{
        $("#f_name_error").text("");
      }

      if((l_name == '') || (l_name == undefined)){
        $("#l_name_error").text("This field are required");
        error = 0;
      }else{
        $("#l_name_error").text("");
      }

      if((email == '') || (email == undefined)){
          $("#email_error").text("This field are required");
          error = 0;
        }else if(!emailPattern.test(email)){
          $("#email_error").text("Enter vaild email id");
          error = 0;
        }else{
          $("#email_error").text("");
        }

      if((phone == '') || (phone == undefined)){
        $("#phone_error").text("This field are required");
        error = 0;
      }else{
        $("#phone_error").text("");
      }
      if((password == '') || (password == undefined)){
        $("#password_error").text("This field are required");
        error = 0;
      }else{
        $("#password_error").text("");
      }
      

        if(error == 1){

            $.ajax({
                url: '<?php echo $base_url ?>/users/check_exist.php',
                type: 'post',
                data: {
                  email: email,
                  phone: phone,
                  table_name: 'tbl_users',
                  
                },
                success: function(response) {
                  
                if (response == 'success') {
                     $("#add_form").submit();
                 }else if (response == 'email_error') {
                    toastr.optionsOverride = 'positionclass = "toast-bottom-left"';
                    toastr.options.positionClass = 'toast-bottom-left';
                    toastr.error('Email Already Exist!');
                 }else if (response == 'phone_error') {
                   
                    toastr.optionsOverride = 'positionclass = "toast-bottom-left"';
                    toastr.options.positionClass = 'toast-bottom-left';
                    toastr.error('Phone Number Already Exist!');
                 }else{
                    toastr.optionsOverride = 'positionclass = "toast-bottom-left"';
                    toastr.options.positionClass = 'toast-bottom-left';
                    toastr.error('Some thing error. Please try again!');
                 }
                }
            });
        }
       
    }
</script>