<?php
if(isset($_COOKIE['username'])){
 include("../conn-web/cw.php");
 include "../header.php";
   
   ?>
<div class="main-content side-content pt-0">
   <div class="container-fluid">
      <!-- Page Header -->
      <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
         <div>
            <h2 class="main-content-title fs-24 mb-1">Membership</h2>
            <ol class="breadcrumb mb-0">
               <li class="breadcrumb-item"><a href="javascript:void(0)">home</a></li>
               <li class="breadcrumb-item active" aria-current="page">Membership</li>
            </ol>
         </div>
       
      </div>
      <!-- Page Header Close -->
      <!-- Start::row-1 -->
      <div class="row">
         <div class="col-xl-12">
            <div class="card custom-card">
               <div class="card-header">
                  <div class="card-title"> Membership List </div>
               </div>
               <div class="card-body">
                  <div id="generic_price_table">   
                      <section>
                              
                              <div class="container">
                                   <?php 
                            
                                        $sql = "select * from  tbl_membership  order by id asc";
                                        $result = mysqli_query($connect,$sql);
                                        $arr_users = [];
                                        if ($result->num_rows > 0) {
                                            $arr_users = $result->fetch_all(MYSQLI_ASSOC);
                                        }
                                     ?>
                                  <!--BLOCK ROW START-->
                                  <div class="row">
                                   <?php 
                                    $count = 0;
                                    foreach($arr_users as $user) {
                                     ?>
                                     <?php if($count == '1'){ 
                                         $active_class= 'active';
                                         $col_class= '';
                                        }else{ 
                                          $active_class= '';
                                          $col_class= 'offset-2';

                                         } ?>

                                      <div class="col-md-4 <?php echo $col_class ?>" >
                                        
                                          <div class="generic_content <?php echo $active_class ?> clearfix">
                                             <div class="generic_head_price clearfix">
                                                <div class="generic_head_content clearfix">
                                                  
                                                    <!--HEAD START-->
                                                      <div class="head_bg"></div>
                                                      <div class="head">
                                                          <span><?php echo $user['heading_title_name']; ?> $<?php echo $user['heading_title_price']; ?> /<?php echo $user['heading_title_plan']; ?>  </span>
                                                      </div>
                                                      <!--//HEAD END-->
                                                      
                                                  </div>
                                                  
                                              </div>                            
                                              <!--//HEAD PRICE DETAIL END-->
                                              
                                              <!--FEATURE LIST START-->
                                              <div class="generic_feature_list">
                                                <ul>
                                                    <li><span>$<?php echo $user['sub_heading1_price']?></span> <?php echo $user['sub_heading1_title']?></li>
                                                    <li><span><?php echo $user['sub_heading2_price']?>%</span> <?php echo $user['sub_heading2_title']?></li>

                                                    <li><?php echo $user['content']?></li>
                                                    
                                                  </ul>
                                              </div>
                                              <!--//FEATURE LIST END-->
                                              
                                              <!--BUTTON START-->
                                              <div class="generic_price_btn clearfix">
                                                <a class="" href="edit.php?pid=<?php echo $user['id']; ?>" >Edit</a>
                                              </div>
                                              <!--//BUTTON END-->
                                              
                                          </div>
                                          <!--//PRICE CONTENT END-->
                                              
                                      </div>
                                    <?php $count++; } ?>  
                                      

                                  </div>  
                                  <!--//BLOCK ROW END-->
                                  
                              </div>
                          </section>             
                        
                      </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<?php include "../footer.php";  ?>
<?php }else{
  header("location:index.php");
} ?>
<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<script>
jQuery(document).ready(function($) {
    $('#tblUser').DataTable({
      "pageLength": 25
      });
});
</script>

<style type="text/css">
 

/*PRICE COLOR CODE START*/
#generic_price_table .generic_content{
  background-color: #fff;
}

#generic_price_table .generic_content .generic_head_price{
  background-color: #f6f6f6;
}

#generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg{
  border-color: #f6b26b rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #f6b26b;
}

#generic_price_table .generic_content .generic_head_price .generic_head_content .head span{
  color: #000;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .price .sign{
    color: #414141;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .price .currency{
    color: #414141;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .price .cent{
    color: #414141;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .month{
    color: #414141;
}

#generic_price_table .generic_content .generic_feature_list ul li{  
  color: #716a6a;
    font-weight: 600;
}

#generic_price_table .generic_content .generic_feature_list ul li span{
  color: #414141;
}
/*#generic_price_table .generic_content .generic_feature_list ul li:hover{
  background-color: #E4E4E4;
  border-left: 5px solid #bf9000;
}*/

#generic_price_table .generic_content .generic_price_btn a{
  border: 1px solid #bf9000; 
    color: #bf9000;
} 

#generic_price_table .generic_content.active .generic_head_price .generic_head_content .head_bg,
#generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head_bg{
  border-color: #bf9000 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #bf9000;
  color: #fff;
}

#generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head span,
#generic_price_table .generic_content.active .generic_head_price .generic_head_content .head span{
  color: #fff;
}

#generic_price_table .generic_content:hover .generic_price_btn a,
#generic_price_table .generic_content.active .generic_price_btn a{
  background-color: #bf9000;
  color: #fff;
} 
#generic_price_table{
  /*margin: 50px 0 50px 0;*/
    font-family: 'Raleway', sans-serif;
}
.row .table{
    padding: 28px 0;
}

/*PRICE BODY CODE START*/

#generic_price_table .generic_content{
  overflow: hidden;
  position: relative;
  text-align: center;
}

#generic_price_table .generic_content .generic_head_price {
  margin: 0 0 20px 0;
}

#generic_price_table .generic_content .generic_head_price .generic_head_content{
  margin: 0 0 50px 0;
}

#generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg{
    border-style: solid;
    border-width: 90px 1411px 23px 399px;
  position: absolute;
}

#generic_price_table .generic_content .generic_head_price .generic_head_content .head{
  padding-top: 40px;
  position: relative;
  z-index: 1;
}

#generic_price_table .generic_content .generic_head_price .generic_head_content .head span{
    font-family: "Raleway",sans-serif;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 2px;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag{
  padding: 0 0 20px;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .price{
  display: block;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .price .sign{
    display: inline-block;
    font-family: "Lato",sans-serif;
    font-size: 28px;
    font-weight: 400;
    vertical-align: middle;
}

.generic_content {
    border: 1px solid #ddd;
}
#generic_price_table .generic_content .generic_head_price .generic_price_tag .price .currency{
    font-family: "Lato",sans-serif;
    font-size: 60px;
    font-weight: 300;
    letter-spacing: -2px;
    line-height: 60px;
    padding: 0;
    vertical-align: middle;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .price .cent{
    display: inline-block;
    font-family: "Lato",sans-serif;
    font-size: 24px;
    font-weight: 400;
    vertical-align: bottom;
}

#generic_price_table .generic_content .generic_head_price .generic_price_tag .month{
    font-family: "Lato",sans-serif;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 3px;
    vertical-align: bottom;
}

#generic_price_table .generic_content .generic_feature_list ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

#generic_price_table .generic_content .generic_feature_list ul li{
  font-family: "Lato", sans-serif;
    font-size: 18px;
    padding: 10px 10px;
    transition: all 0.3s ease-in-out 0s;
    border-bottom: 1px solid #ddd;
}
/*#generic_price_table .generic_content .generic_feature_list ul li:hover{
  transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  -webkit-transition: all 0.3s ease-in-out 0s;

}*/
#generic_price_table .generic_content .generic_feature_list ul li .fa{
  padding: 0 10px;
}
#generic_price_table .generic_content .generic_price_btn{
  margin: 20px 0 32px;
}

#generic_price_table .generic_content .generic_price_btn a{
    border-radius: 50px;
  -moz-border-radius: 50px;
  -ms-border-radius: 50px;
  -o-border-radius: 50px;
  -webkit-border-radius: 50px;
    display: inline-block;
    font-family: "Lato",sans-serif;
    font-size: 18px;
    outline: medium none;
    padding: 12px 30px;
    text-decoration: none;
    text-transform: uppercase;
}

#generic_price_table .generic_content,
#generic_price_table .generic_content:hover,
#generic_price_table .generic_content .generic_head_price .generic_head_content .head_bg,
#generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head_bg,
#generic_price_table .generic_content .generic_head_price .generic_head_content .head h2,
#generic_price_table .generic_content:hover .generic_head_price .generic_head_content .head h2,
#generic_price_table .generic_content .price,
#generic_price_table .generic_content:hover .price,
#generic_price_table .generic_content .generic_price_btn a,
#generic_price_table .generic_content:hover .generic_price_btn a{
  transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  -webkit-transition: all 0.3s ease-in-out 0s;
} 
@media (max-width: 320px) { 
}

@media (max-width: 767px) {
  #generic_price_table .generic_content{
    margin-bottom:75px;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  #generic_price_table .col-md-3{
    float:left;
    width:50%;
  }
  
  #generic_price_table .col-md-4{
    float:left;
    width:50%;
  }
  
  #generic_price_table .generic_content{
    margin-bottom:75px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
}
@media (min-width: 1200px) {
}
#generic_price_table_home{
   font-family: 'Raleway', sans-serif;
}

.text-center h1,
.text-center h1 a{
  color: #7885CB;
  font-size: 30px;
  font-weight: 300;
  text-decoration: none;
}
.demo-pic{
  margin: 0 auto;
}
.demo-pic:hover{
  opacity: 0.7;
}

#generic_price_table_home ul{
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: table;
}
#generic_price_table_home li{
  float: left;
}
#generic_price_table_home li + li{
  margin-left: 10px;
  padding-bottom: 10px;
}
#generic_price_table_home li a{
  display: block;
  width: 50px;
  height: 50px;
  font-size: 0px;
}
#generic_price_table_home .blue{
  background: #3498DB;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .emerald{
  background: #bf9000;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .grey{
  background: #7F8C8D;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .midnight{
  background: #34495E;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .orange{
  background: #E67E22;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .purple{
  background: #9B59B6;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .red{
  background: #E74C3C;
  transition:all 0.3s ease-in-out 0s;
}
#generic_price_table_home .turquoise{
  background: #1ABC9C;
  transition: all 0.3s ease-in-out 0s;
}

#generic_price_table_home .blue:hover,
#generic_price_table_home .emerald:hover,
#generic_price_table_home .grey:hover,
#generic_price_table_home .midnight:hover,
#generic_price_table_home .orange:hover,
#generic_price_table_home .purple:hover,
#generic_price_table_home .red:hover,
#generic_price_table_home .turquoise:hover{
  border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  transition: all 0.3s ease-in-out 0s;
}
#generic_price_table_home .divider{
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 20px;
}
#generic_price_table_home .divider span{
  width: 100%;
  display: table;
  height: 2px;
  background: #ddd;
  margin: 50px auto;
  line-height: 2px;
}
#generic_price_table_home .itemname{
  text-align: center;
  font-size: 50px ;
  padding: 50px 0 20px ;
  border-bottom: 1px solid #ddd;
  margin-bottom: 40px;
  text-decoration: none;
    font-weight: 300;
}
#generic_price_table_home .itemnametext{
    text-align: center;
    font-size: 20px;
    padding-top: 5px;
    text-transform: uppercase;
    display: inline-block;
}
#generic_price_table_home .footer{
  padding:40px 0;
}

.price-heading{
    text-align: center;
}
.price-heading h1{
  color: #666;
  margin: 0;
  padding: 0 0 50px 0;
}
.demo-button {
    background-color: #333333;
    color: #ffffff;
    display: table;
    font-size: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 50px;
    outline-color: -moz-use-text-color;
    outline-style: none;
    outline-width: medium ;
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
}
.bottom_btn{
  background-color: #333333;
    color: #ffffff;
    display: table;
    font-size: 28px;
    margin: 60px auto 20px;
    padding: 10px 25px;
    text-align: center;
    text-transform: uppercase;
}
.demo-button:hover{
  background-color: #666;
  color: #FFF;
  text-decoration:none;
  
}
.bottom_btn:hover{
  background-color: #666;
  color: #FFF;
  text-decoration:none;
}

</style>