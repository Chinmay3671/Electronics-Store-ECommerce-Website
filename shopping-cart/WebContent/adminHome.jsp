<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Admin Dashboard | Electronics Store</title>
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
<body style="background: var(--bg-main);">
	<%
	/* Checking the user credentials */
	String userType = (String) session.getAttribute("usertype");
	String userName = (String) session.getAttribute("username");
	String password = (String) session.getAttribute("password");

	if (userType == null || !userType.equals("admin")) {
		response.sendRedirect("login.jsp?message=Access Denied, Login as admin!!");
	} else if (userName == null || password == null) {
		response.sendRedirect("login.jsp?message=Session Expired, Login Again!!");
	}

	ProductServiceImpl prodService = new ProductServiceImpl();
	List<ProductBean> allProducts = prodService.getAllProducts();
	int totalProducts = allProducts.size();
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		<div style="margin-bottom: 30px;">
			<h2 style="font-size: 28px; margin: 0; display: flex; align-items: center; gap: 12px;">
				<i class="fas fa-chart-line" style="color: var(--secondary);"></i> Admin Workspace Overview
			</h2>
			<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Monitor store inventory, process customer orders, and add new flagship devices</p>
		</div>

		<!-- Dashboard Metric Cards -->
		<div class="row" style="margin-bottom: 30px;">
			<div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
				<div class="card-premium" style="padding: 20px; display: flex; align-items: center; gap: 16px;">
					<div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(37,99,235,0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 22px;">
						<i class="fas fa-boxes"></i>
					</div>
					<div>
						<div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Catalog</div>
						<div style="font-size: 24px; font-weight: 800; color: var(--text-heading);"><%=totalProducts%> Items</div>
					</div>
				</div>
			</div>

			<div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
				<div class="card-premium" style="padding: 20px; display: flex; align-items: center; gap: 16px;">
					<div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(124,58,237,0.1); color: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 22px;">
						<i class="fas fa-warehouse"></i>
					</div>
					<div>
						<div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Inventory Stock</div>
						<div style="font-size: 24px; font-weight: 800; color: var(--text-heading);">Live Stock</div>
					</div>
				</div>
			</div>

			<div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
				<div class="card-premium" style="padding: 20px; display: flex; align-items: center; gap: 16px;">
					<div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(245,158,11,0.1); color: var(--warning); display: flex; align-items: center; justify-content: center; font-size: 22px;">
						<i class="fas fa-shipping-fast"></i>
					</div>
					<div>
						<div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Pending Orders</div>
						<div style="font-size: 24px; font-weight: 800; color: var(--text-heading);">Shipment</div>
					</div>
				</div>
			</div>

			<div class="col-md-3 col-sm-6" style="margin-bottom: 15px;">
				<div class="card-premium" style="padding: 20px; display: flex; align-items: center; gap: 16px;">
					<div style="width: 52px; height: 52px; border-radius: var(--radius-md); background: rgba(16,185,129,0.1); color: var(--success); display: flex; align-items: center; justify-content: center; font-size: 22px;">
						<i class="fas fa-check-circle"></i>
					</div>
					<div>
						<div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">System Status</div>
						<div style="font-size: 24px; font-weight: 800; color: var(--success);">ACTIVE</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Quick Action Panel Grid -->
		<h3 style="font-size: 20px; margin-bottom: 20px;">Quick Management Tools</h3>

		<div class="row">
			<div class="col-md-6 col-sm-6" style="margin-bottom: 20px;">
				<div class="card-premium text-center" style="padding: 30px;">
					<i class="fas fa-plus-circle" style="font-size: 40px; color: var(--primary); margin-bottom: 15px;"></i>
					<h3 style="font-size: 18px; margin-bottom: 8px;">Add New Electronics Product</h3>
					<p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">Upload image, set unit price, stock quantity, and product specifications</p>
					<a href="addProduct.jsp" class="btn-premium-primary" style="padding: 10px 24px !important;">
						<i class="fas fa-plus"></i> Open Product Creator
					</a>
				</div>
			</div>

			<div class="col-md-6 col-sm-6" style="margin-bottom: 20px;">
				<div class="card-premium text-center" style="padding: 30px;">
					<i class="fas fa-boxes" style="font-size: 40px; color: var(--secondary); margin-bottom: 15px;"></i>
					<h3 style="font-size: 18px; margin-bottom: 8px;">Browse Products & Update Details</h3>
					<p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">View complete catalog, edit prices, update info, or remove discontinued items</p>
					<a href="adminViewProduct.jsp" class="btn-premium-secondary" style="padding: 10px 24px !important;">
						<i class="fas fa-list"></i> Manage Product Catalog
					</a>
				</div>
			</div>

			<div class="col-md-6 col-sm-6" style="margin-bottom: 20px;">
				<div class="card-premium text-center" style="padding: 30px;">
					<i class="fas fa-warehouse" style="font-size: 40px; color: var(--accent); margin-bottom: 15px;"></i>
					<h3 style="font-size: 18px; margin-bottom: 8px;">Check Stock & Quantity Levels</h3>
					<p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">Monitor stock counts, track total units sold per device, and refill inventory</p>
					<a href="adminStock.jsp" class="btn-premium-secondary" style="padding: 10px 24px !important;">
						<i class="fas fa-cubes"></i> View Stock Matrix
					</a>
				</div>
			</div>

			<div class="col-md-6 col-sm-6" style="margin-bottom: 20px;">
				<div class="card-premium text-center" style="padding: 30px;">
					<i class="fas fa-shipping-fast" style="font-size: 40px; color: var(--warning); margin-bottom: 15px;"></i>
					<h3 style="font-size: 18px; margin-bottom: 8px;">Ship Pending Customer Orders</h3>
					<p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">Dispatch recent orders, update delivery status, and trigger automated emails</p>
					<a href="unshippedItems.jsp" class="btn-premium-primary" style="padding: 10px 24px !important; background: linear-gradient(135deg, var(--warning), #D97706) !important;">
						<i class="fas fa-truck"></i> Ship Pending Orders
					</a>
				</div>
			</div>
		</div>
	</div>

	<%@ include file="footer.html"%>
</body>
</html>


