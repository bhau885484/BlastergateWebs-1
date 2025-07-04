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
            <i class="fa fa-angle-right show-sidebar" style="display:none;"><a href="#" title="Show Sidebar" rel="tooltip">&nbsp;</a></i><li><a href="<?php echo $base_url ?>/dashboard.php">Dashboard</a> <span class="divider">/</span></li><li><a href="#">Country</a> <span class="divider">/</span></li><li class="active">Add Country</li>
          </ul>
        </div>
      </div>
    </div>
  
    <div class="row-fluid">
    <!-- block -->
    <div class="block">
      <div class="navbar navbar-inner block-header">
        <div class="muted pull-left">Add New Country</div>
      </div>
      <div class="block-content collapse in">
    <div class="span12">
        <form action="save.php" method="post" id="add_country_form" name="add_country_form" class="form-horizontal" accept-charset="utf-8">
            <fieldset>
                <div class="control-group">
                    <label class="control-label" for="focusedInput">Type an address</label>
                    <div class="controls">
                        <input type="text" name="country_address"  class="input-xlarge focused pac-target-input" placeholder="Address" id="country_address" autocomplete="off">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="focusedInput">Country</label>
                    <div class="controls">
                        <input type="text" name="country_name" value="" class="input-xlarge focused" placeholder="Country Name" id="country_name" readonly="1">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="focusedInput">Country Code</label>
                    <div class="controls">
                        <input type="text" name="country_code"  class="input-xlarge focused" placeholder="Country Code" id="country_code" readonly="1">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="focusedInput">Country Dialcode</label>
                    <div class="controls">
                        <input type="text" name="country_mobile_code"  class="input-xlarge focused" placeholder="Dialcode" id="country_mobile_code">
                    </div>
                    <div class="error" id="country_mobile_code_error"></div>
                </div>
                <div class="form-actions">
                    <input type="submit" name="add_country" value="Add Country" class="btn btn-primary" id="submit_button">
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


<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=<?php echo $GOOGLE_MAP_RIDER_KEY; ?>&libraries=places&callback=initMap" async defer></script>
<script type="text/javascript">
function initMap()
{
  // alert();
  //var input = $("#country_address");
  var input = document.getElementById("country_address");
  
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocompleteListener = google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    console.log(place);
    var country_name = "";
    var country_code = "";
    for(i = 0; i < place.address_components.length; i++) {
      if(place.address_components[i]['types'] == 'country,political'){
        country_name = place.address_components[i]['long_name'];
        country_code = place.address_components[i]['short_name'];
      }
    }
    if(country_name=="" || country_code=="")
    {
      $("#submit_button").attr("disabled", "disabled");
    }
    $("#country_name").val(country_name);
    $("#country_code").val(country_code); 
  });
}
$("#add_country_form").on('submit', function(e){

    var form_error = 0;
    var country_mobile_code = $("#country_mobile_code").val();
    if(country_mobile_code!=""){
      if(country_mobile_code.charAt(0) == '+'){
        $("#country_mobile_code").empty();

           }
           else{
            $("#country_mobile_code_error").empty().html('Invalid Country Dialcode');
      form_error = 1;
           }
    }
     if(form_error==1){
      e.preventDefault();
    }
    
  
});
</script>         
