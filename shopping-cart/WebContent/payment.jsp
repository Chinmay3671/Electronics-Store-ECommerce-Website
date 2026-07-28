<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Secure Payment | Electronics Store</title>
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

	String sAmount = request.getParameter("amount");
	double amount = 0;
	if (sAmount != null) {
		amount = Double.parseDouble(sAmount);
	}
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		
		<div style="margin-bottom: 25px; text-align: center;">
			<h2 style="font-size: 26px; margin: 0;"><i class="fas fa-shield-alt" style="color: var(--success);"></i> 256-Bit Encrypted Secure Checkout</h2>
			<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Enter your card payment credentials to place your order</p>
		</div>

		<div class="row">
			<!-- Payment Form Card -->
			<form action="./OrderServlet" method="post"
				class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 card-premium animate-fade-in"
				style="padding: 35px 30px;">
				
				<!-- Virtual Card Mockup Preview -->
				<div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); border-radius: var(--radius-lg); padding: 22px; color: #fff; margin-bottom: 30px; box-shadow: 0 12px 30px rgba(15,23,42,0.3); border: 1px solid rgba(255,255,255,0.1);">
					<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
						<i class="fas fa-microchip" style="font-size: 28px; color: #F59E0B;"></i>
						<i class="fab fa-cc-visa" style="font-size: 32px; color: #94A3B8;"></i>
					</div>
					<div style="font-family: monospace; font-size: 18px; letter-spacing: 3px; margin-bottom: 20px;">
						•••• •••• •••• 4242
					</div>
					<div style="display: flex; justify-content: space-between; font-size: 11px; color: #94A3B8; text-transform: uppercase;">
						<div>CARDHOLDER NAME</div>
						<div>EXPIRES</div>
					</div>
					<div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 600;">
						<div><%=userName != null ? userName.split("@")[0].toUpperCase() : "CUSTOMER"%></div>
						<div>12/28</div>
					</div>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium">Name of Card Holder</label>
					<input type="text" placeholder="John Doe" name="cardholder" class="form-control-premium" required>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium">Credit / Debit Card Number</label>
					<div style="position: relative;">
						<input type="number" placeholder="4242 4242 4242 4242" name="cardnumber" class="form-control-premium" required>
						<i class="fas fa-credit-card" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Expiry Month</label>
						<input type="number" placeholder="MM (e.g. 08)" name="expmonth" class="form-control-premium" max="12" min="1" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Expiry Year</label>
						<input type="number" placeholder="YYYY (e.g. 2028)" class="form-control-premium" name="expyear" min="2024" required>
					</div>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 25px;">
						<label class="form-label-premium">CVV Code</label>
						<input type="password" placeholder="123" class="form-control-premium" name="cvv" maxlength="4" required>
						<input type="hidden" name="amount" value="<%=amount%>">
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 25px;">
						<label class="form-label-premium">Order Total</label>
						<div style="font-size: 20px; font-weight: 800; color: var(--primary); padding: 8px 0;">
							₹<%=String.format("%.2f", amount)%>
						</div>
					</div>
				</div>

				<button type="submit" class="btn-premium-primary" style="width: 100%; padding: 14px !important; font-size: 16px !important;">
					<i class="fas fa-lock"></i> Pay ₹<%=String.format("%.2f", amount)%> & Place Order
				</button>
			</form>
		</div>
	</div>

	<%@ include file="footer.html"%>

</body>
</html>


