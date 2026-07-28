<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Update Product | Admin Portal</title>
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
	String utype = (String) session.getAttribute("usertype");
	String uname = (String) session.getAttribute("username");
	String pwd = (String) session.getAttribute("password");
	String prodid = request.getParameter("prodid");
	ProductBean product = new ProductServiceImpl().getProductDetails(prodid);
	if (prodid == null || product == null) {
		response.sendRedirect("updateProductById.jsp?message=Please Enter a valid product Id");
		return;
	} else if (utype == null || !utype.equals("admin")) {
		response.sendRedirect("login.jsp?message=Access Denied, Login as admin!!");
		return;
	} else if (uname == null || pwd == null) {
		response.sendRedirect("login.jsp?message=Session Expired, Login Again!!");
		return;
	}
	%>

	<jsp:include page="header.jsp" />

	<%
	String message = request.getParameter("message");
	%>
	<div class="container" style="min-height: 75vh; display: flex; align-items: center; justify-content: center; padding: 40px 15px;">
		<div class="row" style="width: 100%;">
			<form action="./UpdateProductSrv" method="post"
				class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 card-premium animate-fade-in"
				style="padding: 35px 30px;">
				
				<div class="text-center" style="margin-bottom: 25px;">
					<div style="width: 80px; height: 80px; border-radius: var(--radius-md); background: #F8FAFC; border: 1px solid var(--border-color); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
						<img src="./ShowImage?pid=<%=product.getProdId()%>" alt="Product Image" style="max-height: 65px; max-width: 65px; object-fit: contain;" />
					</div>
					<h2 style="font-size: 24px; margin-bottom: 6px;">Edit Product Details</h2>
					<p style="color: var(--text-muted); font-size: 13px;">Product ID: <span style="font-family: monospace; font-weight: 700; color: var(--primary);"><%=product.getProdId()%></span></p>

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

				<input type="hidden" name="pid" value="<%=product.getProdId()%>" required>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<label class="form-label-premium">Product Title</label>
						<input type="text" placeholder="Enter Product Name" name="name" class="form-control-premium" value="<%=product.getProdName()%>" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 18px;">
						<%
						String ptype = product.getProdType();
						%>
						<label class="form-label-premium">Category Type</label>
						<select name="type" class="form-control-premium" required style="cursor: pointer;">
							<option value="mobile" <%="mobile".equalsIgnoreCase(ptype) ? "selected" : ""%>>MOBILE</option>
							<option value="tv" <%="tv".equalsIgnoreCase(ptype) ? "selected" : ""%>>TV</option>
							<option value="camera" <%="camera".equalsIgnoreCase(ptype) ? "selected" : ""%>>CAMERA</option>
							<option value="laptop" <%="laptop".equalsIgnoreCase(ptype) ? "selected" : ""%>>LAPTOP</option>
							<option value="tablet" <%="tablet".equalsIgnoreCase(ptype) ? "selected" : ""%>>TABLET</option>
							<option value="speaker" <%="speaker".equalsIgnoreCase(ptype) ? "selected" : ""%>>SPEAKER</option>
							<option value="other" <%="other".equalsIgnoreCase(ptype) ? "selected" : ""%>>OTHER APPLIANCES</option>
						</select>
					</div>
				</div>

				<div class="form-group" style="margin-bottom: 18px;">
					<label class="form-label-premium">Product Description</label>
					<textarea name="info" class="form-control-premium" rows="3" required><%=product.getProdInfo()%></textarea>
				</div>

				<div class="row">
					<div class="col-md-6 form-group" style="margin-bottom: 25px;">
						<label class="form-label-premium">Unit Price (₹)</label>
						<input type="number" value="<%=product.getProdPrice()%>" placeholder="Enter Unit Price" name="price" class="form-control-premium" required>
					</div>
					<div class="col-md-6 form-group" style="margin-bottom: 25px;">
						<label class="form-label-premium">Stock Quantity</label>
						<input type="number" value="<%=product.getProdQuantity()%>" placeholder="Enter Stock Quantity" class="form-control-premium" name="quantity" required>
					</div>
				</div>

				<div class="row" style="gap: 10px;">
					<div class="col-md-6" style="margin-bottom: 10px;">
						<a href="adminViewProduct.jsp" class="btn-premium-secondary" style="width: 100%; text-align: center;">Cancel</a>
					</div>
					<div class="col-md-6">
						<button type="submit" class="btn-premium-primary" style="width: 100%;">
							<i class="fas fa-save"></i> Save Changes
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<%@ include file="footer.html"%>
</body>
</html>



