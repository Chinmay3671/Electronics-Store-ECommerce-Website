<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Account Login | Electronics Store</title>
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

	<%@ include file="header.jsp"%>

	<%
	String message = request.getParameter("message");
	%>
	<div class="container" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 40px 15px;">
		<div class="row" style="width: 100%;">
			<form action="./LoginSrv" method="post"
				class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 card-premium animate-fade-in"
				style="padding: 35px 30px;">
				
				<div class="text-center" style="margin-bottom: 25px;">
					<div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: rgba(37,99,235,0.1); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 15px;">
						<i class="fas fa-lock"></i>
					</div>
					<h2 style="font-size: 24px; margin-bottom: 6px;">Sign In to Your Account</h2>
					<p style="color: var(--text-muted); font-size: 13px;">Enter your credentials to manage orders & checkout</p>

					<%
					if (message != null) {
					%>
					<div class="alert-premium-danger" style="margin-top: 15px; text-align: left;">
						<i class="fas fa-exclamation-circle"></i> <%=message%>
					</div>
					<%
					}
					%>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium"><i class="fas fa-envelope" style="color: var(--text-muted);"></i> Email Address</label>
					<input type="email" placeholder="name@example.com" name="username" class="form-control-premium" required>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium"><i class="fas fa-key" style="color: var(--text-muted);"></i> Password</label>
					<input type="password" placeholder="******" name="password" class="form-control-premium" required>
				</div>

				<div class="form-group" style="margin-bottom: 25px;">
					<label class="form-label-premium"><i class="fas fa-user-tag" style="color: var(--text-muted);"></i> Login Portal Role</label>
					<select name="usertype" class="form-control-premium" required style="cursor: pointer;">
						<option value="customer" selected>CUSTOMER PORTAL</option>
						<option value="admin">ADMIN WORKSPACE</option>
					</select>
				</div>

				<button type="submit" class="btn-premium-primary" style="width: 100%; padding: 12px !important; font-size: 15px !important;">
					<i class="fas fa-sign-in-alt"></i> Sign In
				</button>

				<div class="text-center" style="margin-top: 20px; font-size: 13px; color: var(--text-muted);">
					Don't have an account? <a href="register.jsp" style="color: var(--primary); font-weight: 600; text-decoration: none;">Register now</a>
				</div>
			</form>
		</div>
	</div>

	<%@ include file="footer.html"%>

</body>
</html>

