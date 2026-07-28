<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Create Account | Electronics Store</title>
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
	<div class="container" style="min-height: 75vh; display: flex; align-items: center; justify-content: center; padding: 40px 15px;">
		<div class="row" style="width: 100%;">

			<form action="./RegisterSrv" method="post"
				class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 card-premium animate-fade-in"
				style="padding: 35px 30px;">
				
				<div class="text-center" style="margin-bottom: 25px;">
					<div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: rgba(124,58,237,0.1); color: var(--secondary); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 15px;">
						<i class="fas fa-user-plus"></i>
					</div>
					<h2 style="font-size: 24px; margin-bottom: 6px;">Create Your Account</h2>
					<p style="color: var(--text-muted); font-size: 13px;">Join Electronics Store for member deals & order tracking</p>

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

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Full Name</label>
						<input type="text" name="username" class="form-control-premium" placeholder="John Doe" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Email Address</label>
						<input type="email" name="email" class="form-control-premium" placeholder="john@example.com" required>
					</div>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium">Delivery Address</label>
					<textarea name="address" class="form-control-premium" rows="2" placeholder="House No, Street, Landmark, City..." required></textarea>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Mobile Number</label>
						<input type="number" name="mobile" class="form-control-premium" placeholder="XXXXXXXXXX" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Postal Pin Code</label>
						<input type="number" name="pincode" class="form-control-premium" placeholder="400001" required>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 25px;">
						<label class="form-label-premium">Password</label>
						<input type="password" name="password" class="form-control-premium" placeholder="******" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 25px;">
						<label class="form-label-premium">Confirm Password</label>
						<input type="password" name="confirmPassword" class="form-control-premium" placeholder="******" required>
					</div>
				</div>

				<div class="row" style="gap: 10px;">
					<div class="col-md-6" style="margin-bottom: 10px;">
						<button type="reset" class="btn-premium-secondary" style="width: 100%; padding: 12px !important;">
							<i class="fas fa-undo"></i> Reset Form
						</button>
					</div>
					<div class="col-md-6">
						<button type="submit" class="btn-premium-primary" style="width: 100%; padding: 12px !important;">
							<i class="fas fa-check"></i> Register Account
						</button>
					</div>
				</div>

				<div class="text-center" style="margin-top: 20px; font-size: 13px; color: var(--text-muted);">
					Already registered? <a href="login.jsp" style="color: var(--primary); font-weight: 600; text-decoration: none;">Sign in here</a>
				</div>
			</form>
		</div>
	</div>

	<%@ include file="footer.html"%>
</body>
</html>

