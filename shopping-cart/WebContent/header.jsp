<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.chinm.service.impl.*,com.chinm.service.*"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="css/changes.css">
<link rel="stylesheet" href="css/custom_premium.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>

	<%
	/* Checking the user credentials */
	String userType = (String) session.getAttribute("usertype");
	if (userType == null) { //LOGGED OUT HEADER
	%>

	<!-- Glassmorphism Navbar for Guests -->
	<nav class="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
					data-target="#myNavbar" style="border: none; background: transparent; margin-top: 10px;">
					<span class="icon-bar" style="background: #fff;"></span> 
					<span class="icon-bar" style="background: #fff;"></span> 
					<span class="icon-bar" style="background: #fff;"></span>
				</button>
				<a class="navbar-brand-logo" href="index.jsp">
					<i class="fas fa-bolt" style="color: #60A5FA;"></i>
					Electronics Store
					<span class="badge-logo">PRO</span>
				</a>
			</div>
			
			<div class="collapse navbar-collapse" id="myNavbar">
				<div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 15px;">
					<!-- Search Form in Navbar -->
					<form class="navbar-form" action="index.jsp" method="get" style="border: none; box-shadow: none; margin: 0; padding: 0;">
						<div class="search-container-premium">
							<i class="fas fa-search search-icon-btn"></i>
							<input type="text" class="search-input-premium" name="search"
								placeholder="Search laptops, phones, audio..." required>
						</div>
					</form>

					<ul class="nav navbar-nav navbar-right" style="margin: 0;">
						<li><a href="index.jsp" class="nav-link-custom"><i class="fas fa-store"></i> Products</a></li>
						
						<li class="dropdown">
							<a class="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
								<i class="fas fa-th-large"></i> Categories <span class="caret"></span>
							</a>
							<ul class="dropdown-menu glass-card" style="background: #0F172A !important; border: 1px solid rgba(255,255,255,0.15) !important;">
								<li><a href="index.jsp?type=mobile" style="color: #fff !important;"><i class="fas fa-mobile-alt"></i> Mobiles</a></li>
								<li><a href="index.jsp?type=tv" style="color: #fff !important;"><i class="fas fa-tv"></i> TVs</a></li>
								<li><a href="index.jsp?type=laptop" style="color: #fff !important;"><i class="fas fa-laptop"></i> Laptops</a></li>
								<li><a href="index.jsp?type=camera" style="color: #fff !important;"><i class="fas fa-camera"></i> Cameras</a></li>
								<li><a href="index.jsp?type=speaker" style="color: #fff !important;"><i class="fas fa-volume-up"></i> Speakers</a></li>
								<li><a href="index.jsp?type=tablet" style="color: #fff !important;"><i class="fas fa-tablet-alt"></i> Tablets</a></li>
							</ul>
						</li>
						
						<li><a href="login.jsp" class="nav-link-custom"><i class="fas fa-sign-in-alt"></i> Login</a></li>
						<li>
							<a href="register.jsp" class="btn-premium-primary" style="padding: 8px 18px !important; color: #fff !important;">
								<i class="fas fa-user-plus"></i> Register
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<%
	} else if ("customer".equalsIgnoreCase(userType)) { //CUSTOMER HEADER
		int notf = new CartServiceImpl().getCartCount((String) session.getAttribute("username"));
	%>

	<nav class="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
					data-target="#myNavbar" style="border: none; background: transparent; margin-top: 10px;">
					<span class="icon-bar" style="background: #fff;"></span> 
					<span class="icon-bar" style="background: #fff;"></span> 
					<span class="icon-bar" style="background: #fff;"></span>
				</button>
				<a class="navbar-brand-logo" href="userHome.jsp">
					<i class="fas fa-bolt" style="color: #60A5FA;"></i>
					Electronics Store
					<span class="badge-logo">PRO</span>
				</a>
			</div>

			<div class="collapse navbar-collapse" id="myNavbar">
				<div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 15px;">
					<form class="navbar-form" action="userHome.jsp" method="get" style="border: none; box-shadow: none; margin: 0; padding: 0;">
						<div class="search-container-premium">
							<i class="fas fa-search search-icon-btn"></i>
							<input type="text" class="search-input-premium" name="search"
								placeholder="Search gadgets, accessories..." required>
						</div>
					</form>

					<ul class="nav navbar-nav navbar-right" style="margin: 0;">
						<li><a href="userHome.jsp" class="nav-link-custom"><i class="fas fa-store"></i> Products</a></li>
						
						<li class="dropdown">
							<a class="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
								<i class="fas fa-th-large"></i> Categories <span class="caret"></span>
							</a>
							<ul class="dropdown-menu glass-card" style="background: #0F172A !important; border: 1px solid rgba(255,255,255,0.15) !important;">
								<li><a href="userHome.jsp?type=mobile" style="color: #fff !important;"><i class="fas fa-mobile-alt"></i> Mobiles</a></li>
								<li><a href="userHome.jsp?type=tv" style="color: #fff !important;"><i class="fas fa-tv"></i> TVs</a></li>
								<li><a href="userHome.jsp?type=laptop" style="color: #fff !important;"><i class="fas fa-laptop"></i> Laptops</a></li>
								<li><a href="userHome.jsp?type=camera" style="color: #fff !important;"><i class="fas fa-camera"></i> Cameras</a></li>
								<li><a href="userHome.jsp?type=speaker" style="color: #fff !important;"><i class="fas fa-volume-up"></i> Speakers</a></li>
								<li><a href="userHome.jsp?type=tablet" style="color: #fff !important;"><i class="fas fa-tablet-alt"></i> Tablets</a></li>
							</ul>
						</li>

						<li>
							<a href="cartDetails.jsp" class="nav-link-custom">
								<i class="fas fa-shopping-bag"></i> Cart
								<% if (notf > 0) { %>
									<span class="cart-badge-counter"><%=notf%></span>
								<% } %>
							</a>
						</li>

						<li><a href="orderDetails.jsp" class="nav-link-custom"><i class="fas fa-box"></i> Orders</a></li>
						<li><a href="userProfile.jsp" class="nav-link-custom"><i class="fas fa-user-circle"></i> Profile</a></li>
						<li><a href="./LogoutSrv" class="nav-link-custom" style="color: #F87171 !important;"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<%
	} else { //ADMIN HEADER
	%>

	<nav class="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
					data-target="#myNavbar" style="border: none; background: transparent; margin-top: 10px;">
					<span class="icon-bar" style="background: #fff;"></span> 
					<span class="icon-bar" style="background: #fff;"></span> 
					<span class="icon-bar" style="background: #fff;"></span>
				</button>
				<a class="navbar-brand-logo" href="adminViewProduct.jsp">
					<i class="fas fa-user-shield" style="color: #A78BFA;"></i>
					Admin Portal
				</a>
			</div>

			<div class="collapse navbar-collapse" id="myNavbar">
				<div style="display: flex; align-items: center; justify-content: flex-end; width: 100%; flex-wrap: wrap; gap: 15px;">
					<ul class="nav navbar-nav navbar-right" style="margin: 0;">
						<li><a href="adminViewProduct.jsp" class="nav-link-custom"><i class="fas fa-boxes"></i> Products</a></li>
						<li><a href="adminStock.jsp" class="nav-link-custom"><i class="fas fa-warehouse"></i> Inventory Stock</a></li>
						<li><a href="unshippedItems.jsp" class="nav-link-custom"><i class="fas fa-shipping-fast"></i> Orders to Ship</a></li>
						<li><a href="shippedItems.jsp" class="nav-link-custom"><i class="fas fa-check-circle"></i> Shipped</a></li>
						
						<li class="dropdown">
							<a class="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
								<i class="fas fa-edit"></i> Manage Items <span class="caret"></span>
							</a>
							<ul class="dropdown-menu glass-card" style="background: #0F172A !important; border: 1px solid rgba(255,255,255,0.15) !important;">
								<li><a href="addProduct.jsp" style="color: #fff !important;"><i class="fas fa-plus-circle"></i> Add Product</a></li>
								<li><a href="updateProductById.jsp" style="color: #fff !important;"><i class="fas fa-edit"></i> Update Product</a></li>
								<li><a href="removeProduct.jsp" style="color: #fff !important;"><i class="fas fa-trash-alt"></i> Remove Product</a></li>
							</ul>
						</li>

						<li><a href="./LogoutSrv" class="nav-link-custom" style="color: #F87171 !important;"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	<%
	}
	%>

</body>
</html>

