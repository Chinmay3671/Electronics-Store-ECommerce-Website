<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Admin - View Products | Electronics Store</title>
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
	String userType = (String) session.getAttribute("usertype");

	if (userType == null || !userType.equals("admin")) {
		response.sendRedirect("login.jsp?message=Access Denied, Login as admin!!");
	} else if (userName == null || password == null) {
		response.sendRedirect("login.jsp?message=Session Expired, Login Again!!");
	}

	ProductServiceImpl prodDao = new ProductServiceImpl();
	List<ProductBean> products = new ArrayList<ProductBean>();

	String search = request.getParameter("search");
	String type = request.getParameter("type");
	String message = "All Products Catalog";
	if (search != null) {
		products = prodDao.searchAllProducts(search);
		message = "Results for '" + search + "'";
	} else if (type != null) {
		products = prodDao.getAllProductsByType(type);
		message = type.toUpperCase() + " Collection";
	} else {
		products = prodDao.getAllProducts();
	}
	if (products.isEmpty()) {
		message = "No items found for '" + (search != null ? search : type) + "'";
		products = prodDao.getAllProducts();
	}
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		
		<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 25px; gap: 15px;">
			<div>
				<h2 style="font-size: 26px; margin: 0; text-transform: capitalize;"><i class="fas fa-boxes" style="color: var(--primary);"></i> <%=message%></h2>
				<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Admin inventory management and catalog controls</p>
			</div>

			<div>
				<a href="addProduct.jsp" class="btn-premium-primary" style="padding: 10px 20px !important;">
					<i class="fas fa-plus"></i> Add New Product
				</a>
			</div>
		</div>

		<!-- Product Grid -->
		<div class="row">
			<%
			for (ProductBean product : products) {
			%>
			<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
				<div class="product-card-premium">
					<div class="product-img-wrapper">
						<span class="product-tag-category"><%=product.getProdType()%></span>
						<img src="./ShowImage?pid=<%=product.getProdId()%>" alt="<%=product.getProdName()%>" loading="lazy">
					</div>

					<div class="product-title-premium">
						<%=product.getProdName()%>
						<span style="font-size: 11px; color: var(--text-muted); font-weight: 500; font-family: monospace; display: block;">ID: <%=product.getProdId()%></span>
					</div>

					<%
					String description = product.getProdInfo();
					description = description.substring(0, Math.min(description.length(), 90));
					%>
					<div class="product-desc-premium"><%=description%>...</div>

					<div class="product-price-row">
						<div>
							<span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Unit Price</span>
							<span class="product-price-amount" style="display: block;">
								<span class="product-price-currency">₹</span><%=String.format("%.2f", product.getProdPrice())%>
							</span>
						</div>
						<div>
							<span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">Stock</span>
							<span style="font-size: 14px; font-weight: 800; color: var(--text-heading); display: block;"><%=product.getProdQuantity()%> Units</span>
						</div>
					</div>

					<form method="post">
						<div class="product-btn-group">
							<button type="submit"
								formaction="./RemoveProductSrv?prodid=<%=product.getProdId()%>"
								class="btn-premium-danger">
								<i class="fas fa-trash-alt"></i> Remove
							</button>
							<button type="submit"
								formaction="updateProduct.jsp?prodid=<%=product.getProdId()%>"
								class="btn-premium-primary">
								<i class="fas fa-edit"></i> Edit Product
							</button>
						</div>
					</form>
				</div>
			</div>
			<%
			}
			%>
		</div>
	</div>

	<%@ include file="footer.html"%>

</body>
</html>



