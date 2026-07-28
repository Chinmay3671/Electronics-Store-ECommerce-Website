<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.beans.*,com.chinm.service.*,java.util.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Admin - Orders to Ship | Electronics Store</title>
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
				<i class="fas fa-shipping-fast" style="color: var(--warning);"></i> Unshipped Customer Orders
			</h2>
			<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Review pending purchases and click "Ship Now" to update delivery status and notify buyers</p>
		</div>

		<div class="card-premium">
			<div class="table-responsive">
				<table class="table-premium">
					<thead>
						<tr>
							<th>Transaction ID</th>
							<th>Product ID</th>
							<th>Buyer Email</th>
							<th>Delivery Address</th>
							<th>Qty</th>
							<th>Status</th>
							<th class="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						<%
						OrderServiceImpl orderdao = new OrderServiceImpl();
						List<OrderBean> orders = orderdao.getAllOrders();
						int count = 0;
						for (OrderBean order : orders) {
							String transId = order.getTransactionId();
							String prodId = order.getProductId();
							int quantity = order.getQuantity();
							int shipped = order.getShipped();
							String userId = new TransServiceImpl().getUserId(transId);
							String userAddr = new UserServiceImpl().getUserAddr(userId);
							if (shipped == 0) {
								count++;
						%>
						<tr>
							<td><span style="font-family: monospace; font-size: 12px; font-weight: 700; background: #F1F5F9; padding: 4px 8px; border-radius: 4px;"><%=transId%></span></td>
							<td><a href="./updateProduct.jsp?prodid=<%=prodId%>" style="font-family: monospace; font-size: 12px; font-weight: 700; color: var(--primary); text-decoration: none;"><%=prodId%></a></td>
							<td style="font-weight: 600;"><%=userId%></td>
							<td style="max-width: 250px; font-size: 13px; color: var(--text-muted);"><%=userAddr%></td>
							<td style="font-weight: 700;"><%=quantity%> Units</td>
							<td>
								<span style="background: var(--warning-bg); color: #B45309; border: 1px solid #FCD34D; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: var(--radius-full);">
									<i class="fas fa-clock"></i> READY_TO_SHIP
								</span>
							</td>
							<td class="text-center">
								<a href="ShipmentServlet?orderid=<%=order.getTransactionId()%>&amount=<%=order.getAmount()%>&userid=<%=userId%>&prodid=<%=order.getProductId()%>"
									class="btn-premium-primary" style="padding: 6px 16px !important; font-size: 12px !important;">
									<i class="fas fa-paper-plane"></i> SHIP NOW
								</a>
							</td>
						</tr>
						<%
							}
						}
						%>
						<%
						if (count == 0) {
						%>
						<tr>
							<td colspan="7" class="text-center" style="padding: 35px; color: var(--text-muted); font-size: 14px;">
								<i class="fas fa-check-circle" style="color: var(--success); font-size: 24px; display: block; margin-bottom: 8px;"></i>
								No pending orders! All placed customer orders have been shipped.
							</td>
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


