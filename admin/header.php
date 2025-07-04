<!DOCTYPE html>
<html lang="en" dir="ltr" data-nav-layout="vertical" data-theme-mode="light" data-header-styles="light" data-menu-styles="dark" data-toggled="open">
   <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
   <!-- /Added by HTTrack -->
   <head>
      <meta charset="utf-8">
      <meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
      <meta name="description" content="">
      <meta name="author" content="">
      <meta name="keywords" content="">
      <title>Admin </title>
      <link  id="style" href="<?php echo $base_url ?>/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
      <link href="<?php echo $base_url ?>/assets/plugins/web-fonts/icons.css" rel="stylesheet">
      <link href="<?php echo $base_url ?>/assets/plugins/web-fonts/font-awesome/font-awesome.min.css" rel="stylesheet">
      <link href="<?php echo $base_url ?>/assets/plugins/web-fonts/plugin.css" rel="stylesheet">
      <!-- STYLE CSS -->
      <link href="<?php echo $base_url ?>/assets/css/style.css" rel="stylesheet">
      <link href="<?php echo $base_url ?>/assets/css/ticket.css" rel="stylesheet">
      <!-- <link href="<?php echo $base_url ?>/assets/css/styles.min.css" rel="stylesheet"> -->
      <link href="<?php echo $base_url ?>/assets/css/plugins.css" rel="stylesheet">
      <!-- SWITCHER CSS -->
      <link href="<?php echo $base_url ?>/assets/switcher/css/switcher.css" rel="stylesheet">
      <link href="<?php echo $base_url ?>/assets/switcher/demo.css" rel="stylesheet">
      <!-- 
         <link href="<?php echo $base_url ?>/assets/css/custom.css" rel="stylesheet"> -->
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

     

      
      
   </head>
   <body>
      <div class="loading" id="preloader" style="display: none;">Loading&#8230;</div>

      <div class="page">
      <div class="main-header side-header sticky">
         <div class="main-container container-fluid">
            <div class="main-header-left">
               <a class="main-header-menu-icon" href="javascript:void(0);" id="mainSidebarToggle" onclick="showHideMenu();"><span></span></a>
               <div class="hor-logo">
                  <a class="main-logo" href="index.html">
                  <img src="<?php echo $base_url ?>/assets/img/logo.png" class="header-brand-img desktop-logo" alt="logo">
                  <img src="<?php echo $base_url ?>/assets/img/logo.png" class="header-brand-img desktop-logo-dark"
                     alt="logo">
                  </a>
               </div>
            </div>
            <div class="main-header-center">
               <div class="responsive-logo">
                  <a href="index.html"><img src="<?php echo $base_url ?>/assets/img/logo.png" class="mobile-logo" alt="logo"></a>
                  
               </div>
               
            </div>
            <div class="main-header-right">
               <div class="navbar navbar-expand-lg  nav nav-item  navbar-nav-right responsive-navbar navbar-dark  ">
                  <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
                     <div class="d-flex order-lg-2 ms-auto">
                        <!-- Search -->
                        <div class="dropdown header-search">
                           <a class="nav-link icon header-search">
                           <i class="fe fe-search header-icons"></i>
                           </a>
                        </div>
                        <!-- Profile -->
                        <div class="dropdown main-profile-menu">
                           <a class="d-flex" href="javascript:void(0);">
                           <span class="main-img-user"><img alt="avatar"
                              src="<?php echo $base_url ?>/assets/img/users/1.jpg"></span>
                           </a>
                           <div class="dropdown-menu">
                              <div class="header-navheading">
                                 <h6 class="main-notification-title">Admin</h6>
                                 <!-- <p class="main-notification-text">Web Designer</p> -->
                              </div>
                              <!-- <a class="dropdown-item border-top" href="javascript:void(0)">
                              <i class="fe fe-user"></i> My Profile
                              </a>
                              <a class="dropdown-item" href="javascript:void(0)">
                              <i class="fe fe-edit"></i> Edit Profile
                              </a>
                              <a class="dropdown-item" href="javascript:void(0)">
                              <i class="fe fe-settings"></i> Account Settings
                              </a> -->
                              <a class="dropdown-item" href="<?php echo $base_url ?>/logout.php">
                              <i class="fe fe-power"></i> Sign Out
                              </a>
                           </div>
                        </div>
                        <!-- Profile -->
                        <!-- Sidebar -->
                        <!-- Sidebar -->
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- <div class="jumps-preve	nt" style="padding-top: 64.2px;"></div> -->
      <div class="sticky">
         <div class="main-menu main-sidebar main-sidebar-sticky side-menu" id="side_menu">
            <div class="main-sidebar-header main-container-1 active">
               <div class="sidemenu-logo">
                  <a class="main-logo" href="index.php">
                     <img src="<?php echo $base_url ?>/assets/img/logo.png" class="header-brand-img desktop-logo" alt="logo">
                     <!-- <img src="<?php echo $base_url ?>/assets/img/brand/icon-light.png" class="header-brand-img icon-logo" alt="logo"> -->
                     <img src="<?php echo $base_url ?>/assets/img/logo.png" class="header-brand-img desktop-logo theme-logo" alt="logo">
                     <!-- <img src="<?php echo $base_url ?>/assets/img/brand/icon.png" class="header-brand-img icon-logo theme-logo" alt="logo"> -->
                  </a>
               </div>
               <div class="main-sidebar-body main-body-1">
                  <div class="slide-left disabled" id="slide-left"><i class="fe fe-chevron-left"></i></div>
                  <?php
                  $getUriSegments = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
                  echo $getUrl = $getUriSegments[3]; //returns category
                 ?>
                 
                  <ul class="menu-nav nav" style="margin-left: 0px; margin-right: 0px; overflow-y: scroll; height: 580px;">
                     <!-- <li class="nav-header"><span class="nav-label">Dashboard</span></li> -->
                     <?php if($getUrl == 'dashboard.php'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?> 
                        <a class="nav-link" href="<?php echo $base_url ?>/dashboard.php">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i class="ti-home sidemenu-icon menu-icon"></i>
                        <span class="sidemenu-label">Dashboard</span>
                        </a>
                     </li>

                     <?php if($getUrl == 'landing_page.php'){ ?>
                     <li class="nav-item">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?> 
                        <a class="nav-link" href="<?php echo $base_url ?>/landing-page/send.php">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i class="ti-home sidemenu-icon menu-icon"></i>
                        <span class="sidemenu-label">Landing Page</span>
                        </a>
                     </li>

                     <?php if($getUrl == 'users'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?> 
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Users
                              
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="side-menu-label1"><a href="javascript:void(0)">Users</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/users/view.php">View All Users</a></li>
                        </ul>
                     </li>
                     


                     <?php if($getUrl == 'event'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Event Management
                             
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/event/add.php">Add New Event</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/event/view.php">Event List</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/event/upcomming-view.php">Upcoming Events</a></li>
                        </ul>
                     </li>

                     <?php if($getUrl == 'event-payment-type'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Event Payment Type
                             
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <!-- <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/event/add.php">Add New Event</a></li> -->
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/event-payment-type/view.php">Event Payment Type List</a></li>
                           
                        </ul>
                     </li>

                      <?php if($getUrl == 'promocode'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                             Promo Code Management
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/promocode/add.php">Add Promo Code</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/promocode/view.php">Promo Code List</a></li>
                        </ul>
                     </li>


                    <?php if($getUrl == 'room'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Room Management
                              <!-- <span class="sidemenu-label2">Currencies</span> -->
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/room/add.php">Add Room</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/room/view.php">Room List</a></li>
                        </ul>
                     </li>


                    <!--  <?php if($getUrl == 'room-night'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Additional Room Night
                             
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/room-night/add.php">Add Room Nignt</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/room-night/view.php">Room Nignt List</a></li>
                        </ul>
                     </li> -->

                     <?php if($getUrl == 'ticket-booking'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?> 
                        <a class="nav-link" href="<?php echo $base_url ?>/ticket-booking/view.php">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i class="ti-home sidemenu-icon menu-icon"></i>
                        <span class="sidemenu-label">Event Ticket Booking</span>
                        </a>
                     </li>

                     <?php if($getUrl == 'pay-per-click'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Chocolate Factory
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/pay-per-click/view.php">All Chocolate Factory User</a></li>
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/pay-per-click/view-photo-price.php">Chocolate Factory Image Price</a></li>
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/pay-per-click/view-video-price.php">Chocolate Factory Video Price</a></li>
                            <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/pay-per-click/view-admin-commission.php">Chocolate Factory Admin Commission</a></li>
                           <!-- <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/policy/view.php">Policy List</a></li> -->
                        </ul>
                     </li>


                     <?php if($getUrl == 'policy'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              CMS Page Management
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"><a  class="nav-sub-link" href="<?php echo $base_url ?>/policy/add.php">Add Policy</a></li>
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/policy/view.php">Policy List</a></li>
                        </ul>
                     </li>


                     <?php if($getUrl == 'notification'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?>
                        <a class="nav-link with-sub" href="javascript:void(0)">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                           <span class="sidemenu-label">
                              Notification Management
                           </span>
                           <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">

                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/first-time-notification/view.php">First Time Notification</a></li>
                           
                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/all-user-notification/view.php">User Notification</a></li>

                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/event-notification/view.php">Event Notification</a></li>

                           <li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/chocolate-factory-notification/view.php">Chocolate Factory Notification</a></li>


                           

                        </ul>
                     </li>
                    

                     <?php if($getUrl == 'membership'){ ?>
                     <li class="nav-item active show">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?> 
                        <a class="nav-link" href="<?php echo $base_url ?>/membership/view.php">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i class="ti-home sidemenu-icon menu-icon"></i>
                        <span class="sidemenu-label">Membership Management</span>
                        </a>
                     </li>

                     <?php if($getUrl == 'membership-user'){ ?>
                        <li class="nav-item active show">
                        <?php }else{ ?>
                         <li class="nav-item ">
                        <?php } ?> 
                           <a class="nav-link" href="<?php echo $base_url ?>/membership-user/view.php">
                           <span class="shape1"></span>
                           <span class="shape2"></span>
                           <i class="ti-home sidemenu-icon menu-icon"></i>
                           <span class="sidemenu-label">Membership User List</span>
                           </a>
                        </li>


                     
                     
                     <?php if($getUrl == 'paymentgetway'){ ?>
                        <li class="nav-item active show">
                        <?php }else{ ?>
                         <li class="nav-item ">
                        <?php } ?>
                        <a class="nav-link with-sub"  href="<?php echo $base_url ?>/paymentgetway/view.php">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                        <span class="sidemenu-label">Payment Gateway
                        </span>
                        <i class="angle fe fe-chevron-right"></i>
                        </a>
                     </li>

                     <?php if($getUrl == 'feedback.php'){ ?>
                     <li class="nav-item">
                     <?php }else{ ?>
                      <li class="nav-item ">
                     <?php } ?> 
                        <a class="nav-link" href="<?php echo $base_url ?>/feedback/view.php">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i class="ti-home sidemenu-icon menu-icon"></i>
                        <span class="sidemenu-label">Feedback List</span>
                        </a>
                     </li>

                     <!-- <li class="nav-item">
                        <a class="nav-link with-sub"  href="javascript:void(0)">
                        <span class="shape1"></span>
                        <span class="shape2"></span>
                        <i  class="ti-wallet sidemenu-icon menu-icon "></i>
                        <span class="sidemenu-label">CMS Page Management
                        </span>
                        <i class="angle fe fe-chevron-right"></i>
                        </a>
                        <ul class="nav-sub">
                           <li class="nav-sub-item"> <a  class="nav-sub-link" href="<?php echo $base_url ?>/add-policy.php">Add Policy</a></li>
                           <li class="nav-sub-item"> <a  class="nav-sub-link" href="<?php echo $base_url ?>/list-policy.php">List Policy</a></li>
                        </ul>
                     </li> -->
                  </ul>
                  <div class="slide-right" id="slide-right"><i class="fe fe-chevron-right"></i></div>
               </div>
            </div>
         </div>
      </div>