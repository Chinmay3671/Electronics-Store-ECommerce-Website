<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Order History | Electronics Store</title>
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

	OrderService dao = new OrderServiceImpl();
	List<OrderDetails> orders = dao.getAllOrderDetails(userName);
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		
		<div style="margin-bottom: 25px;">
			<h2 style="font-size: 26px; margin: 0; display: flex; align-items: center; gap: 10px;">
				<i class="fas fa-box-open" style="color: var(--primary);"></i> My Order History
			</h2>
			<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Track your past purchases, shipment statuses, and receipts</p>
		</div>

		<% if (orders.isEmpty()) { %>
			<div class="card-premium text-center" style="padding: 50px 20px;">
				<div style="width: 80px; height: 80px; border-radius: 50%; background: #F1F5F9; color: var(--text-muted); display: inline-flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 18px;">
					<i class="fas fa-receipt"></i>
				</div>
				<h3 style="font-size: 20px; margin-bottom: 6px;">No Orders Placed Yet</h3>
				<p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">You haven't ordered any electronics items yet.</p>
				<a href="userHome.jsp" class="btn-premium-primary">
					<i class="fas fa-shopping-bag"></i> Start Shopping
				</a>
			</div>
		<% } else { %>

		<div class="card-premium">
			<div class="table-responsive">
				<table class="table-premium">
					<thead>
						<tr>
							<th>Item</th>
							<th>Product Name</th>
							<th>Order Reference</th>
							<th>Qty</th>
							<th>Paid Amount</th>
							<th>Order Date</th>
							<th class="text-center">Delivery Status</th>
						</tr>
					</thead>
					<tbody>
						<%
						for (OrderDetails order : orders) {
						%>
						<tr>
							<td>
								<div style="width: 50px; height: 50px; border-radius: var(--radius-md); background: #F8FAFC; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center;">
									<img src="./ShowImage?pid=<%=order.getProductId()%>" style="max-height: 40px; max-width: 40px; object-fit: contain;">
								</div>
							</td>
							<td style="font-weight: 700; color: var(--text-heading);"><%=order.getProdName()%></td>
							<td><span style="font-family: monospace; font-size: 12px; background: #F1F5F9; padding: 4px 8px; border-radius: 4px; font-weight: 600;"><%=order.getOrderId()%></span></td>
							<td style="font-weight: 600;"><%=order.getQty()%></td>
							<td style="font-weight: 800; color: var(--primary);">₹<%=String.format("%.2f", order.getAmount())%></td>
							<td style="font-size: 13px; color: var(--text-muted);"><%=order.getTime()%></td>
							<td class="text-center">
								<% if (order.getShipped() == 0) { %>
									<span style="background: var(--warning-bg); color: #B45309; border: 1px solid #FCD34D; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); display: inline-flex; align-items: center; gap: 4px;">
										<i class="fas fa-clock"></i> PROCESSING
									</span>
								<% } else { %>
									<span style="background: var(--success-bg); color: #047857; border: 1px solid #6EE7B7; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); display: inline-flex; align-items: center; gap: 4px;">
										<i class="fas fa-truck"></i> SHIPPED
									</span>
								<% } %>
							</td>
						</tr>
						<%
						}
						%>
					</tbody>
				</table>
			</div>
		</div>

		<% } %>

	</div>

	<%@ include file="footer.html"%>
</body>
</html>


