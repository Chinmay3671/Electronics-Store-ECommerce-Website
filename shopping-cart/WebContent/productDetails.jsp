<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<%
	try {
	String userName = (String) session.getAttribute("username");
	String prodId = request.getParameter("pid");
	
	ProductServiceImpl prodService = new ProductServiceImpl();
	ProductBean product = null;
	List<ProductBean> relatedProducts = new ArrayList<ProductBean>();
	int cartQty = 0;

	if (prodId != null && !prodId.trim().isEmpty()) {
		product = prodService.getProductDetails(prodId);
	}
	if (product == null) {
		List<ProductBean> all = prodService.getAllProducts();
		if (all != null && !all.isEmpty()) {
			product = all.get(0);
		}
	}

	if (userName != null && product != null) {
		cartQty = new CartServiceImpl().getCartItemCount(userName, product.getProdId());
	}

	if (product != null && product.getProdType() != null) {
		relatedProducts = prodService.getAllProductsByType(product.getProdType());
	}
%>
<!DOCTYPE html>
<html>
<head>
<title><%=product != null ? product.getProdName() : "Product Details"%> | Electronics Store</title>
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

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		
		<!-- Breadcrumb Navigation -->
		<ul class="breadcrumb" style="background: rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px;">
			<li><a href="index.jsp" style="color: var(--primary);"><i class="fas fa-home"></i> Home</a></li>
			<li><a href="index.jsp?type=<%=product != null ? product.getProdType() : "mobile"%>" style="color: var(--primary); text-transform: capitalize;"><%=product != null ? product.getProdType() : "Catalog"%></a></li>
			<li class="active" style="color: var(--text-muted);"><%=product != null ? product.getProdName() : "Product Details"%></li>
		</ul>

		<% if (product != null) { %>
		<div class="row">
			<!-- Product Image Section -->
			<div class="col-md-6 col-sm-12">
				<div class="glass-card" style="padding: 30px; text-align: center; border-radius: 20px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.1);">
					<span class="product-tag-category" style="top: 20px; left: 20px; font-size: 13px; padding: 6px 14px;"><%=product.getProdType()%></span>
					<img src="./ShowImage?pid=<%=product.getProdId()%>" alt="<%=product.getProdName()%>" style="max-height: 380px; max-width: 100%; object-fit: contain; border-radius: 12px; margin: 20px 0;">
				</div>
			</div>

			<!-- Product Details Info Section -->
			<div class="col-md-6 col-sm-12">
				<div style="padding: 10px 0;">
					<h1 style="font-size: 32px; font-weight: 800; color: var(--text-heading); margin-top: 0; line-height: 1.3;">
						<%=product.getProdName()%>
					</h1>

					<div style="display: flex; align-items: center; gap: 15px; margin: 15px 0;">
						<div style="color: var(--warning); font-size: 15px; font-weight: 600;">
							<i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star-half-alt"></i> 4.8 (128 reviews)
						</div>
						<span style="color: var(--text-muted);">|</span>
						<span style="color: var(--success); font-weight: 600; font-size: 14px;">
							<i class="fas fa-check-circle"></i> In Stock (<%=product.getProdQuantity()%> units)
						</span>
					</div>

					<div style="margin: 25px 0; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
						<span style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 4px;">Price</span>
						<div style="font-size: 36px; font-weight: 800; color: var(--accent);">
							<span style="font-size: 22px; margin-right: 4px;">Rs.</span><%=String.format("%.2f", product.getProdPrice())%>
						</div>
						<p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Inclusive of all taxes. Free shipping included.</p>
					</div>

					<!-- Product Description -->
					<div style="margin-bottom: 30px;">
						<h4 style="font-size: 16px; font-weight: 700; color: var(--text-heading); margin-bottom: 10px;">Technical Overview</h4>
						<p style="color: var(--text-muted); font-size: 15px; line-height: 1.7;">
							<%=product.getProdInfo() != null ? product.getProdInfo() : "No detailed description available."%>
						</p>
					</div>

					<!-- Actions Buttons -->
					<form method="post">
						<% if (cartQty == 0) { %>
						<div style="display: flex; gap: 15px; flex-wrap: wrap;">
							<button type="submit" formaction="./AddtoCart?uid=<%=userName%>&pid=<%=product.getProdId()%>&pqty=1" class="btn-premium-primary" style="padding: 14px 32px !important; font-size: 16px !important; flex: 1;">
								<i class="fas fa-cart-plus"></i> Add to Cart
							</button>
							<button type="submit" formaction="./AddtoCart?uid=<%=userName%>&pid=<%=product.getProdId()%>&pqty=1" class="btn-premium-secondary" style="padding: 14px 28px !important; font-size: 16px !important;">
								<i class="fas fa-bolt"></i> Buy Now
							</button>
						</div>
						<% } else { %>
						<div style="display: flex; gap: 15px; flex-wrap: wrap;">
							<button type="submit" formaction="./AddtoCart?uid=<%=userName%>&pid=<%=product.getProdId()%>&pqty=0" class="btn-premium-danger" style="padding: 14px 28px !important; font-size: 16px !important;">
								<i class="fas fa-trash-alt"></i> Remove from Cart
							</button>
							<button type="submit" formaction="cartDetails.jsp" class="btn-premium-primary" style="padding: 14px 32px !important; font-size: 16px !important; flex: 1;">
								<i class="fas fa-shopping-bag"></i> Proceed to Checkout
							</button>
						</div>
						<% } %>
					</form>
				</div>
			</div>
		</div>

		<!-- Related Products Section -->
		<% if (relatedProducts != null && !relatedProducts.isEmpty()) { %>
		<div style="margin-top: 60px;">
			<h3 style="font-size: 22px; font-weight: 700; margin-bottom: 20px;">
				<i class="fas fa-tags" style="color: var(--secondary);"></i> Similar <%=product.getProdType()%> Devices
			</h3>

			<div class="row">
				<%
				int count = 0;
				for (ProductBean relProd : relatedProducts) {
					if (relProd == null || relProd.getProdId() == null) continue;
					if (!relProd.getProdId().equals(product.getProdId()) && count < 3) {
						count++;
				%>
				<div class="col-md-4 col-sm-6">
					<div class="product-card-premium">
						<div class="product-img-wrapper">
							<span class="product-tag-category"><%=relProd.getProdType()%></span>
							<a href="productDetails.jsp?pid=<%=relProd.getProdId()%>">
								<img src="./ShowImage?pid=<%=relProd.getProdId()%>" alt="<%=relProd.getProdName()%>" loading="lazy">
							</a>
						</div>
						<div class="product-title-premium">
							<a href="productDetails.jsp?pid=<%=relProd.getProdId()%>" style="color: var(--text-heading); text-decoration: none;">
								<%=relProd.getProdName()%>
							</a>
						</div>
						<div class="product-price-row">
							<span class="product-price-amount">Rs. <%=String.format("%.2f", relProd.getProdPrice())%></span>
							<a href="productDetails.jsp?pid=<%=relProd.getProdId()%>" class="btn-premium-secondary" style="padding: 6px 14px !important; font-size: 12px !important;">
								View Specs
							</a>
						</div>
					</div>
				</div>
				<%
					}
				}
				%>
			</div>
		</div>
		<% } %>

		<% } %>

	</div>

	<%@ include file="footer.html"%>

<%
	} catch (Throwable t) {
		System.err.println("productDetails Catch: " + t.getMessage());
	}
%>

</body>
</html>
