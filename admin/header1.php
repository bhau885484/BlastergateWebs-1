
<!DOCTYPE html>
<html lang="en" dir="ltr" data-nav-layout="vertical" data-theme-mode="light" data-header-styles="light" data-menu-styles="dark" data-toggled="open">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
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
     <!-- <link href="<?php echo $base_url ?>/assets/css/styles.min.css" rel="stylesheet"> -->
    <link href="<?php echo $base_url ?>/assets/css/plugins.css" rel="stylesheet">

    <!-- SWITCHER CSS -->
    <link href="<?php echo $base_url ?>/assets/switcher/css/switcher.css" rel="stylesheet">
    <link href="<?php echo $base_url ?>/assets/switcher/demo.css" rel="stylesheet">
        

</head>
    <body>
		
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
							<!-- <a href="index.html"><img src="<?php echo $base_url ?>/assets/img/logo.png" class="mobile-logo-dark"
									alt="logo"></a> -->
						</div>
						<!-- <div class="input-group">
							<div class="input-group-btn search-panel">
								<select class="form-control select2">
									<option label="All categories">
									</option>
									<option value="IT Projects">
										IT Projects
									</option>
									<option value="Business Case">
										Business Case
									</option>
									<option value="Microsoft Project">
										Microsoft Project
									</option>
									<option value="Risk Management">
										Risk Management
									</option>
									<option value="Team Building">
										Team Building
									</option>
								</select>
							</div>
							<input type="search" class="form-control rounded-0" placeholder="Search for anything...">
							<button class="btn search-btn"><i class="fe fe-search"></i></button>
						</div> -->
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
											<a class="dropdown-item border-top" href="javascript:void(0)">
												<i class="fe fe-user"></i> My Profile
											</a>
											<a class="dropdown-item" href="javascript:void(0)">
												<i class="fe fe-edit"></i> Edit Profile
											</a>
											<a class="dropdown-item" href="javascript:void(0)">
												<i class="fe fe-settings"></i> Account Settings
											</a>
											
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
							<ul class="menu-nav nav">
								<!-- <li class="nav-header"><span class="nav-label">Dashboard</span></li> -->
								<li class="nav-item ">
									<a class="nav-link " href="<?php echo $base_url ?>/dashboard.php">
										<span class="shape1"></span>
										<span class="shape2"></span>
										<i class="ti-home sidemenu-icon menu-icon"></i>
										<span class="sidemenu-label">Dashboard</span>
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link with-sub" href="javascript:void(0)">
										<span class="shape1"></span>
										<span class="shape2"></span>
										<i  class="ti-wallet sidemenu-icon menu-icon "></i>
										<span class="sidemenu-label">Users
											<!-- <span class="sidemenu-label2">Currencies</span> -->
										</span>
										<i class="angle fe fe-chevron-right"></i>
									</a>
									<ul class="nav-sub">
										<li class="side-menu-label1"><a href="javascript:void(0)">Users</a></li>
										<li class="nav-sub-item"> <a class="nav-sub-link" href="<?php echo $base_url ?>/users/view.php">View All Users</a></li>
										
										
									</ul>
								</li>
								<!-- <li class="nav-item">
									<a class="nav-link with-sub" href="javascript:void(0)">
										<span class="shape1"></span>
										<span class="shape2"></span>
										<i class="ti-shopping-cart-full sidemenu-icon menu-icon "></i>
										<span class="sidemenu-label">ECommerce</span>
										<i class="angle fe fe-chevron-right"></i>
									</a>
									<ul class="nav-sub">
										<li class="side-menu-label1"><a href="javascript:void(0)">E-Commerce</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-dashboard.html">Dashboard</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-products.html">Products</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-product-details.html">Product Details</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-cart.html">Cart</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-wishlist.html">Wishlist</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-checkout.html">Checkout</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-orders.html">Orders</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-addproduct.html">Add Product</a></li>
										<li class="nav-sub-item"><a class="nav-sub-link" href="ecommerce-account.html">Account</a></li>
									</ul>
								</li> -->
								
								
							</ul>
							<div class="slide-right" id="slide-right"><i class="fe fe-chevron-right"></i></div>
						</div>
					</div>
				</div>
			</div>
            

          