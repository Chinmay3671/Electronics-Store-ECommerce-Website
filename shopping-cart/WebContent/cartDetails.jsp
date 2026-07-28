<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Shopping Cart | Electronics Store</title>
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

	String addS = request.getParameter("add");
	if (addS != null) {
		int add = Integer.parseInt(addS);
		String uid = request.getParameter("uid");
		String pid = request.getParameter("pid");
		int avail = Integer.parseInt(request.getParameter("avail"));
		int cartQty = Integer.parseInt(request.getParameter("qty"));
		CartServiceImpl cart = new CartServiceImpl();

		if (add == 1) {
			cartQty += 1;
			if (cartQty <= avail) {
				cart.addProductToCart(uid, pid, 1);
			} else {
				response.sendRedirect("./AddtoCart?pid=" + pid + "&pqty=" + cartQty);
			}
		} else if (add == 0) {
			cart.removeProductFromCart(uid, pid);
		}
	}
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		
		<div style="margin-bottom: 25px;">
			<h2 style="font-size: 26px; margin: 0; display: flex; align-items: center; gap: 10px;">
				<i class="fas fa-shopping-bag" style="color: var(--primary);"></i> Your Shopping Cart
			</h2>
			<p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Review your items before proceeding to secure checkout</p>
		</div>

		<%
		CartServiceImpl cart = new CartServiceImpl();
		List<CartBean> cartItems = cart.getAllCartItems(userName);
		double totAmount = 0;
		int totalItemCount = 0;
		%>

		<% if (cartItems.isEmpty()) { %>
			<!-- Empty Cart State -->
			<div class="card-premium text-center" style="padding: 60px 20px;">
				<div style="width: 90px; height: 90px; border-radius: 50%; background: #F1F5F9; color: var(--text-muted); display: inline-flex; align-items: center; justify-content: center; font-size: 38px; margin-bottom: 20px;">
					<i class="fas fa-shopping-cart"></i>
				</div>
				<h3 style="font-size: 22px; margin-bottom: 8px;">Your Shopping Cart is Empty</h3>
				<p style="color: var(--text-muted); font-size: 14px; max-width: 400px; margin: 0 auto 25px auto;">
					Looks like you haven't added any flagship smartphones, laptops, or accessories to your cart yet.
				</p>
				<a href="userHome.jsp" class="btn-premium-primary" style="padding: 12px 28px !important; font-size: 15px !important;">
					<i class="fas fa-arrow-left"></i> Explore Electronics Catalog
				</a>
			</div>
		<% } else { %>

		<div class="row">
			<!-- Cart Items List -->
			<div class="col-lg-8 col-md-8 col-sm-12" style="margin-bottom: 25px;">
				<div class="card-premium" style="padding: 20px;">
					<div class="table-responsive">
						<table class="table-premium">
							<thead>
								<tr>
									<th>Product Details</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Subtotal</th>
									<th class="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								<%
								for (CartBean item : cartItems) {
									String prodId = item.getProdId();
									int prodQuantity = item.getQuantity();
									ProductBean product = new ProductServiceImpl().getProductDetails(prodId);
									double currAmount = product.getProdPrice() * prodQuantity;
									totAmount += currAmount;
									totalItemCount += prodQuantity;

									if (prodQuantity > 0) {
								%>
								<tr>
									<td>
										<div style="display: flex; align-items: center; gap: 14px;">
											<div style="width: 60px; height: 60px; border-radius: var(--radius-md); background: #F8FAFC; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
												<img src="./ShowImage?pid=<%=product.getProdId()%>" style="max-height: 50px; max-width: 50px; object-fit: contain;">
											</div>
											<div>
												<div style="font-weight: 700; color: var(--text-heading);"><%=product.getProdName()%></div>
												<div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;"><%=product.getProdType()%></div>
											</div>
										</div>
									</td>
									<td style="font-weight: 600;">₹<%=String.format("%.2f", product.getProdPrice())%></td>
									<td>
										<!-- Inline Quantity Form -->
										<form method="post" action="./UpdateToCart" style="display: flex; align-items: center; gap: 6px;">
											<input type="number" name="pqty" value="<%=prodQuantity%>" class="form-control-premium" style="width: 65px; padding: 6px 10px; text-align: center;" min="0">
											<input type="hidden" name="pid" value="<%=product.getProdId()%>">
											<button type="submit" name="Update" class="btn-premium-secondary" style="padding: 6px 10px !important; font-size: 11px !important;">
												Update
											</button>
										</form>
									</td>
									<td style="font-weight: 800; color: var(--primary);">₹<%=String.format("%.2f", currAmount)%></td>
									<td class="text-center">
										<div style="display: flex; gap: 6px; justify-content: center;">
											<a href="cartDetails.jsp?add=1&uid=<%=userName%>&pid=<%=product.getProdId()%>&avail=<%=product.getProdQuantity()%>&qty=<%=prodQuantity%>"
												class="btn-premium-secondary" style="padding: 6px 10px !important;" title="Add One">
												<i class="fas fa-plus" style="font-size: 11px;"></i>
											</a>
											<a href="cartDetails.jsp?add=0&uid=<%=userName%>&pid=<%=product.getProdId()%>&avail=<%=product.getProdQuantity()%>&qty=<%=prodQuantity%>"
												class="btn-premium-danger" style="padding: 6px 10px !important;" title="Remove One">
												<i class="fas fa-minus" style="font-size: 11px;"></i>
											</a>
										</div>
									</td>
								</tr>
								<%
									}
								}
								%>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Summary Sidebar -->
			<div class="col-lg-4 col-md-4 col-sm-12">
				<div class="card-premium">
					<h3 style="font-size: 18px; margin-top: 0; margin-bottom: 20px;">Order Summary</h3>
					
					<div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
						<span style="color: var(--text-muted);">Items (<%=totalItemCount%>)</span>
						<span style="font-weight: 600;">₹<%=String.format("%.2f", totAmount)%></span>
					</div>

					<div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
						<span style="color: var(--text-muted);">Estimated Express Delivery</span>
						<span style="color: var(--success); font-weight: 600;">FREE</span>
					</div>

					<div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
						<span style="color: var(--text-muted);">Taxes & Duties</span>
						<span style="color: var(--text-muted); font-size: 13px;">Included</span>
					</div>

					<hr style="border-top: 1px solid var(--border-color); margin: 18px 0;">

					<div style="display: flex; justify-content: space-between; margin-bottom: 25px; align-items: baseline;">
						<span style="font-size: 16px; font-weight: 700; color: var(--text-heading);">Total Payable</span>
						<span style="font-size: 26px; font-weight: 800; color: var(--primary);">₹<%=String.format("%.2f", totAmount)%></span>
					</div>

					<form method="post" style="display: flex; flex-direction: column; gap: 12px;">
						<button formaction="payment.jsp?amount=<%=totAmount%>" class="btn-premium-primary" style="width: 100%; padding: 14px !important; font-size: 16px !important;">
							<i class="fas fa-lock"></i> Proceed to Checkout
						</button>
						<button formaction="userHome.jsp" class="btn-premium-secondary" style="width: 100%;">
							<i class="fas fa-arrow-left"></i> Continue Shopping
						</button>
					</form>
				</div>
			</div>
		</div>

		<% } %>

	</div>

	<%@ include file="footer.html"%>

</body>
</html>



