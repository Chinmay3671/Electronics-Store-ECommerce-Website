<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Add Product | Admin Portal</title>
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
	%>

	<jsp:include page="header.jsp" />

	<%
	String message = request.getParameter("message");
	%>
	<div class="container" style="min-height: 75vh; display: flex; align-items: center; justify-content: center; padding: 40px 15px;">
		<div class="row" style="width: 100%;">
			<form action="./AddProductSrv" method="post"
				enctype="multipart/form-data" class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 card-premium animate-fade-in"
				style="padding: 35px 30px;">
				
				<div class="text-center" style="margin-bottom: 25px;">
					<div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: rgba(37,99,235,0.1); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 15px;">
						<i class="fas fa-plus-circle"></i>
					</div>
					<h2 style="font-size: 24px; margin-bottom: 6px;">Add New Electronics Device</h2>
					<p style="color: var(--text-muted); font-size: 13px;">Publish new smartphones, laptops, audio & gadgets to store catalog</p>

					<%
					if (message != null) {
					%>
					<div class="alert-premium-success" style="margin-top: 15px; text-align: left;">
						<i class="fas fa-check-circle"></i> <%=message%>
					</div>
					<%
					}
					%>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Product Title</label>
						<input type="text" placeholder="e.g. iPhone 15 Pro Max" name="name" class="form-control-premium" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Category Type</label>
						<select name="type" class="form-control-premium" required style="cursor: pointer;">
							<option value="mobile">MOBILE</option>
							<option value="tv">TV</option>
							<option value="camera">CAMERA</option>
							<option value="laptop">LAPTOP</option>
							<option value="tablet">TABLET</option>
							<option value="speaker">SPEAKER</option>
							<option value="other">OTHER APPLIANCES</option>
						</select>
					</div>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium">Specifications & Description</label>
					<textarea name="info" class="form-control-premium" rows="3" placeholder="Enter device specs, RAM, Storage, Warranty details..." required></textarea>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Unit Price (₹)</label>
						<input type="number" placeholder="e.g. 54999" name="price" class="form-control-premium" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Initial Stock Quantity</label>
						<input type="number" placeholder="e.g. 100" name="quantity" class="form-control-premium" required>
					</div>
				</div>

				<div class="form-group" style="margin-bottom: 25px;">
					<label class="form-label-premium">Product Image File</label>
					<input type="file" name="image" class="form-control-premium" style="padding: 8px 14px;" required>
				</div>

				<div class="row">
					<div class="col-md-6" style="margin-bottom: 10px;">
						<button type="reset" class="btn-premium-secondary" style="width: 100%; padding: 12px !important;">
							<i class="fas fa-undo"></i> Reset Form
						</button>
					</div>
					<div class="col-md-6">
						<button type="submit" class="btn-premium-primary" style="width: 100%; padding: 12px !important;">
							<i class="fas fa-upload"></i> Publish Product
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<%@ include file="footer.html"%>
</body>
</html>

