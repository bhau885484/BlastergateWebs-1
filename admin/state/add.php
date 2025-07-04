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
            <i class="fa fa-angle-right show-sidebar" style="display:none;"><a href="#" title="Show Sidebar" rel="tooltip">&nbsp;</a></i><li><a href="<?php echo $base_url ?>/dashboard.php">Dashboard</a> <span class="divider">/</span></li><li><a href="#">State</a> <span class="divider">/</span></li><li class="active">Add State</li>
          </ul>
        </div>
      </div>
    </div>
  
    <div class="row-fluid">
    <!-- block -->
    <div class="block">
      <div class="navbar navbar-inner block-header">
        <div class="muted pull-left">Add New State</div>
      </div>
      <div class="block-content collapse in">
    <div class="span12">
        <form action="save.php" method="post" id="add_state_form" name="add_state_form" class="form-horizontal" accept-charset="utf-8">
            <fieldset>

              <div class="control-group">
                    <label class="control-label" for="focusedInput">Country</label>
                    <div class="controls">
                        <select  name="country_id" class="form-control" id="country_id" required="required" onchange="disableaddress()">
                          <option value="">--Select Country--</option> 
                          <?php 
                          $query="SELECT * FROM tbl_countries WHERE status=1";
                          $results = mysqli_query($connect, $query);
                          foreach ($results as $country_list){
                          ?>
                          <option value="<?php echo $country_list["id"];?>,<?php echo $country_list["country_code"];?>"><?php echo $country_list["country_name"];?></option> 
                          <?php } ?>
                        </select>
                    </div>
                </div>


                <div class="control-group">
                    <label class="control-label" for="focusedInput">Type an address</label>
                    <div class="controls">
                        <input type="text" name="country_address"  class="input-xlarge focused pac-target-input" placeholder="Address" id="country_address" autocomplete="off">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="focusedInput">State Name</label>
                    <div class="controls">
                        <input type="text" name="state_name" value="" class="input-xlarge focused" placeholder="State Name" id="state_name" readonly="1">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="focusedInput">State Code</label>
                    <div class="controls">
                        <input type="text" name="state_code"  class="input-xlarge focused" placeholder="Country Code" id="state_code" readonly="1">
                    </div>
                </div>
                
                <div class="form-actions">
                    <input type="submit" name="add_country" value="Add State" class="btn btn-primary" id="submit_button">
                    <!-- <a class="btn" href="">Cancel</a> -->
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


<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=<?php echo $GOOGLE_MAP_RIDER_KEY; ?>&libraries=places"></script>
<script type="text/javascript">
$(document).ready(function(){
  disableaddress();
})
function disableaddress(){

  $("country_address").attr("disabled", "disabled");
  var country_name = $("#country_id").val();

  if(country_name!=""){
    var countrycode = country_name.split(',').pop();
    if(countrycode!=""){
      countrycode = countrycode.toLowerCase().trim();
      initMap(countrycode);
      $("country_address").removeAttr("disabled");
    }
  }
}
function initMap(country_code)
{
  // alert(country_code);
  var input = document.getElementById("country_address");
  var options = { componentRestrictions: { country: country_code } };
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    var statename = "";
    var state_code = "";
    for(i = 0; i < place.address_components.length; i++) {
      if(place.address_components[i]['types'] == 'administrative_area_level_1,political'){
        statename = place.address_components[i]['long_name'];
        state_code = place.address_components[i]['short_name'];
      }
    }
    if(statename=="" || state_code=="")
    {
      $("#submit_button").attr("disabled", "disabled");
    }
    $("#state_name").val(statename);
    $("#state_code").val(state_code);
  });
}
</script>         