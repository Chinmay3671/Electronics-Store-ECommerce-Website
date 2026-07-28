<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Remove Product | Admin Portal</title>
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
	<div class="container" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 40px 15px;">
		<div class="row" style="width: 100%;">
			<form action="./RemoveProductSrv" method="post"
				class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 card-premium animate-fade-in"
				style="padding: 35px 30px;">
				
				<div class="text-center" style="margin-bottom: 25px;">
					<div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: rgba(239,68,68,0.1); color: var(--danger); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 15px;">
						<i class="fas fa-trash-alt"></i>
					</div>
					<h3 style="font-size: 22px; margin-bottom: 6px;">Remove Product</h3>
					<p style="color: var(--text-muted); font-size: 13px;">Enter Product ID to delete item from store catalog</p>

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

				<div class="form-group" style="margin-bottom: 25px;">
					<label class="form-label-premium">Product ID</label>
					<input type="text" placeholder="e.g. P20230423082243" name="prodid" class="form-control-premium" required>
				</div>

				<div class="row">
					<div class="col-md-6" style="margin-bottom: 10px;">
						<a href="adminViewProduct.jsp" class="btn-premium-secondary" style="width: 100%;">Cancel</a>
					</div>
					<div class="col-md-6">
						<button type="submit" class="btn-premium-danger" style="width: 100%;">
							<i class="fas fa-trash"></i> Remove
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<%@ include file="footer.html"%>
</body>
</html>


