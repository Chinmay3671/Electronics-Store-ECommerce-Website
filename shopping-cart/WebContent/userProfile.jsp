<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>User Profile | Electronics Store</title>
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
	String userName = (String) session.getAttribute("username");
	String password = (String) session.getAttribute("password");

	if (userName == null || password == null) {
		response.sendRedirect("login.jsp?message=Session Expired, Login Again!!");
	}

	UserService dao = new UserServiceImpl();
	UserBean user = dao.getUserDetails(userName, password);
	if (user == null)
		user = new UserBean("Test User", 98765498765L, "test@gmail.com", "ABC colony, Patna, bihar", 87659, "lksdjf");
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		<!-- Breadcrumb -->
		<div class="card-premium" style="padding: 14px 20px; margin-bottom: 25px;">
			<ol class="breadcrumb mb-0" style="background: transparent; padding: 0; margin: 0;">
				<li><a href="index.jsp" style="color: var(--primary); font-weight: 600;"><i class="fas fa-home"></i> Home</a></li>
				<li class="active" style="color: var(--text-muted);">User Account Profile</li>
			</ol>
		</div>

		<div class="row">
			<!-- Profile Sidebar Card -->
			<div class="col-lg-4 col-md-4 col-sm-12">
				<div class="card-premium text-center" style="margin-bottom: 25px;">
					<div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 800; margin: 0 auto 20px auto; box-shadow: 0 10px 25px var(--primary-glow);">
						<%=user.getName() != null && !user.getName().isEmpty() ? user.getName().substring(0,1).toUpperCase() : "U"%>
					</div>
					<h3 style="font-size: 20px; margin-bottom: 4px;"><%=user.getName()%></h3>
					<p style="color: var(--text-muted); font-size: 13px; margin-bottom: 18px;"><%=user.getEmail()%></p>
					
					<div style="border-top: 1px solid var(--border-color); padding-top: 15px; display: flex; justify-content: space-around;">
						<div>
							<div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Status</div>
							<div style="font-size: 13px; font-weight: 700; color: var(--success);"><i class="fas fa-check-circle"></i> Verified</div>
						</div>
						<div style="border-left: 1px solid var(--border-color);"></div>
						<div>
							<div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Member</div>
							<div style="font-size: 13px; font-weight: 700; color: var(--primary);">PRO</div>
						</div>
					</div>
				</div>

				<div class="card-premium" style="padding: 16px 20px;">
					<h4 style="font-size: 15px; margin-top: 0; margin-bottom: 15px;"><i class="fas fa-link" style="color: var(--primary);"></i> Quick Account Actions</h4>
					<a href="orderDetails.jsp" class="btn-premium-secondary" style="width: 100%; margin-bottom: 10px; justify-content: flex-start;">
						<i class="fas fa-box-open"></i> My Order History
					</a>
					<a href="cartDetails.jsp" class="btn-premium-secondary" style="width: 100%; justify-content: flex-start;">
						<i class="fas fa-shopping-cart"></i> View Shopping Cart
					</a>
				</div>
			</div>

			<!-- Profile Details Column -->
			<div class="col-lg-8 col-md-8 col-sm-12">
				<div class="card-premium">
					<h3 style="font-size: 20px; margin-top: 0; margin-bottom: 25px; display: flex; align-items: center; gap: 10px;">
						<i class="fas fa-id-card" style="color: var(--primary);"></i> Personal Information
					</h3>

					<div class="table-responsive">
						<table class="table-premium">
							<tbody>
								<tr>
									<td style="font-weight: 700; width: 30%; color: var(--text-heading);"><i class="fas fa-user" style="color: var(--text-muted); margin-right: 8px;"></i> Full Name</td>
									<td style="font-weight: 600; color: var(--primary);"><%=user.getName()%></td>
								</tr>
								<tr>
									<td style="font-weight: 700; color: var(--text-heading);"><i class="fas fa-envelope" style="color: var(--text-muted); margin-right: 8px;"></i> Email Address</td>
									<td><%=user.getEmail()%></td>
								</tr>
								<tr>
									<td style="font-weight: 700; color: var(--text-heading);"><i class="fas fa-phone" style="color: var(--text-muted); margin-right: 8px;"></i> Phone Number</td>
									<td><%=user.getMobile()%></td>
								</tr>
								<tr>
									<td style="font-weight: 700; color: var(--text-heading);"><i class="fas fa-map-marker-alt" style="color: var(--text-muted); margin-right: 8px;"></i> Delivery Address</td>
									<td><%=user.getAddress()%></td>
								</tr>
								<tr>
									<td style="font-weight: 700; color: var(--text-heading);"><i class="fas fa-mail-bulk" style="color: var(--text-muted); margin-right: 8px;"></i> Pin Code</td>
									<td><span style="background: #F1F5F9; padding: 4px 10px; border-radius: var(--radius-sm); font-weight: 600;"><%=user.getPinCode()%></span></td>
								</tr>
							</tbody>
						</table>
					</div>

					<div style="margin-top: 25px; text-align: right;">
						<a href="./LogoutSrv" class="btn-premium-danger">
							<i class="fas fa-sign-out-alt"></i> Logout Session
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<%@ include file="footer.html"%>

</body>
</html>


