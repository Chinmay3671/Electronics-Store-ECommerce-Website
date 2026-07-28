<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Admin - Stock Inventory | Electronics Store</title>
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

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		
		<div style="margin-bottom: 25px;">
			<h2 style="font-size: 26px; margin: 0; display: flex; align-items: center; gap: 10px;">
				<i class="fas fa-warehouse" style="color: var(--secondary);"></i> Inventory Stock Matrix
			</h2>
			<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Monitor current stock counts, total sales per device, and replenish inventory</p>
		</div>

		<div class="card-premium">
			<div class="table-responsive">
				<table class="table-premium">
					<thead>
						<tr>
							<th>Image</th>
							<th>Product ID</th>
							<th>Device Name</th>
							<th>Category</th>
							<th>Unit Price</th>
							<th>Total Sold</th>
							<th>Available Stock</th>
							<th class="text-center">Stock Actions</th>
						</tr>
					</thead>
					<tbody>
						<%
						ProductServiceImpl productDao = new ProductServiceImpl();
						List<ProductBean> products = productDao.getAllProducts();
						for (ProductBean product : products) {
							int soldQty = new OrderServiceImpl().countSoldItem(product.getProdId());
						%>
						<tr>
							<td>
								<div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #F8FAFC; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center;">
									<img src="./ShowImage?pid=<%=product.getProdId()%>" style="max-height: 38px; max-width: 38px; object-fit: contain;">
								</div>
							</td>
							<td><a href="./updateProduct.jsp?prodid=<%=product.getProdId()%>" style="font-family: monospace; font-size: 12px; font-weight: 700; color: var(--primary); text-decoration: none;"><%=product.getProdId()%></a></td>
							<%
							String name = product.getProdName();
							name = name.substring(0, Math.min(name.length(), 30)) + "..";
							%>
							<td style="font-weight: 700; color: var(--text-heading);"><%=name%></td>
							<td><span style="background: #F1F5F9; padding: 4px 10px; border-radius: var(--radius-full); font-size: 11px; font-weight: 700; text-transform: uppercase;"><%=product.getProdType()%></span></td>
							<td style="font-weight: 700;">₹<%=String.format("%.2f", product.getProdPrice())%></td>
							<td><span style="color: var(--secondary); font-weight: 700;"><%=soldQty%> Units</span></td>
							<td>
								<% if (product.getProdQuantity() < 10) { %>
									<span style="color: var(--danger); font-weight: 800;"><%=product.getProdQuantity()%> (LOW STOCK)</span>
								<% } else { %>
									<span style="color: var(--success); font-weight: 700;"><%=product.getProdQuantity()%> Units</span>
								<% } %>
							</td>
							<td class="text-center">
								<div style="display: flex; gap: 8px; justify-content: center;">
									<form method="post">
										<button type="submit"
											formaction="updateProduct.jsp?prodid=<%=product.getProdId()%>"
											class="btn-premium-secondary" style="padding: 6px 12px !important; font-size: 12px !important;">
											<i class="fas fa-edit"></i> Edit
										</button>
									</form>
									<form method="post">
										<button type="submit"
											formaction="./RemoveProductSrv?prodid=<%=product.getProdId()%>"
											class="btn-premium-danger" style="padding: 6px 12px !important; font-size: 12px !important;">
											<i class="fas fa-trash"></i>
										</button>
									</form>
								</div>
							</td>
						</tr>
						<%
						}
						%>
						<%
						if (products.isEmpty()) {
						%>
						<tr>
							<td colspan="8" class="text-center" style="padding: 30px; color: var(--text-muted);">No Products Available in Stock</td>
						</tr>
						<%
						}
						%>
					</tbody>
				</table>
			</div>
		</div>

	</div>

	<%@ include file="footer.html"%>
</body>
</html>



