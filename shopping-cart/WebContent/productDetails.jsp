<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Product Details | Electronics Store</title>
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
	String userName = (String) session.getAttribute("username");
	String prodId = request.getParameter("pid");
	
	if (prodId == null || prodId.trim().isEmpty()) {
		response.sendRedirect("index.jsp");
		return;
	}

	ProductServiceImpl prodService = new ProductServiceImpl();
	ProductBean product = prodService.getProductDetails(prodId);

	if (product == null) {
		response.sendRedirect("index.jsp");
		return;
	}

	int cartQty = 0;
	if (userName != null) {
		cartQty = new CartServiceImpl().getCartItemCount(userName, product.getProdId());
	}

	List<ProductBean> relatedProducts = prodService.getAllProductsByType(product.getProdType());
	%>

	<jsp:include page="header.jsp" />

	<div class="container" style="margin-top: 30px; margin-bottom: 60px;">
		<!-- Breadcrumb -->
		<div class="card-premium" style="padding: 12px 20px; margin-bottom: 30px;">
			<ol class="breadcrumb mb-0" style="background: transparent; padding: 0; margin: 0;">
				<li><a href="index.jsp" style="color: var(--primary); font-weight: 600;"><i class="fas fa-home"></i> Home</a></li>
				<li><a href="index.jsp?type=<%=product.getProdType()%>" style="color: var(--primary); font-weight: 600; text-transform: capitalize;"><%=product.getProdType()%>s</a></li>
				<li class="active" style="color: var(--text-muted);"><%=product.getProdName()%></li>
			</ol>
		</div>

		<!-- Product Showcase Hero Card -->
		<div class="card-premium animate-fade-in" style="padding: 40px 30px;">
			<div class="row">
				<!-- High-Res Image Column -->
				<div class="col-md-5 col-sm-12 text-center" style="margin-bottom: 25px;">
					<div style="background: #F8FAFC; border-radius: var(--radius-lg); border: 1px solid var(--border-color); padding: 40px; display: flex; align-items: center; justify-content: center; position: relative;">
						<span class="product-tag-category" style="top: 15px; left: 15px; font-size: 12px; padding: 5px 12px;"><%=product.getProdType()%></span>
						<img src="./ShowImage?pid=<%=product.getProdId()%>" alt="<%=product.getProdName()%>" style="max-height: 280px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15)); transition: var(--transition-smooth);" id="mainProductImage">
					</div>
				</div>

				<!-- Product Meta & Purchase Controls Column -->
				<div class="col-md-7 col-sm-12">
					<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
						<span style="background: rgba(16, 185, 129, 0.1); color: var(--success); font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full);">
							<i class="fas fa-check-circle"></i> In Stock (<%=product.getProdQuantity()%> Available)
						</span>
						<span style="color: var(--warning); font-size: 14px; font-weight: 700;">
							<i class="fas fa-star"></i> 4.9 (128 Customer Reviews)
						</span>
					</div>

					<h1 style="font-size: 30px; font-weight: 800; color: var(--text-heading); margin-top: 0; margin-bottom: 12px;">
						<%=product.getProdName()%>
					</h1>

					<div style="font-family: monospace; font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
						Product SKU: <strong style="color: var(--text-heading);"><%=product.getProdId()%></strong>
					</div>

					<!-- Pricing Section -->
					<div style="background: #F8FAFC; border-radius: var(--radius-md); padding: 18px 24px; border: 1px dashed var(--border-color); margin-bottom: 25px; display: flex; align-items: baseline; gap: 15px;">
						<div>
							<span style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block;">Offer Price</span>
							<span style="font-size: 34px; font-weight: 800; color: var(--primary);">
								Rs. <%=String.format("%.2f", product.getProdPrice())%>
							</span>
						</div>
						<div style="color: var(--success); font-size: 14px; font-weight: 700; background: var(--success-bg); padding: 4px 10px; border-radius: 6px;">
							Save 15% (MRP Inclusive of all Taxes)
						</div>
					</div>

					<!-- Action Buttons -->
					<form method="post" style="margin-bottom: 30px;">
						<% if (cartQty == 0) { %>
						<div style="display: flex; gap: 14px; flex-wrap: wrap;">
							<button type="submit"
								formaction="./AddtoCart?uid=<%=userName != null ? userName : ""%>&pid=<%=product.getProdId()%>&pqty=1"
								class="btn-premium-secondary" style="padding: 14px 28px !important; font-size: 15px !important;">
								<i class="fas fa-cart-plus"></i> Add to Cart
							</button>
							<button type="submit"
								formaction="./AddtoCart?uid=<%=userName != null ? userName : ""%>&pid=<%=product.getProdId()%>&pqty=1"
								class="btn-premium-primary" style="padding: 14px 32px !important; font-size: 15px !important;">
								<i class="fas fa-bolt"></i> Buy Now
							</button>
						</div>
						<% } else { %>
						<div style="display: flex; gap: 14px; flex-wrap: wrap;">
							<button type="submit"
								formaction="./AddtoCart?uid=<%=userName != null ? userName : ""%>&pid=<%=product.getProdId()%>&pqty=0"
								class="btn-premium-danger" style="padding: 14px 28px !important; font-size: 15px !important;">
								<i class="fas fa-trash-alt"></i> Remove From Cart
							</button>
							<button type="submit" formaction="cartDetails.jsp"
								class="btn-premium-primary" style="padding: 14px 32px !important; font-size: 15px !important;">
								<i class="fas fa-shopping-bag"></i> Proceed to Checkout
							</button>
						</div>
						<% } %>
					</form>

					<!-- Trust Highlights -->
					<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px; color: var(--text-body);">
						<div><i class="fas fa-truck" style="color: var(--primary); margin-right: 8px;"></i> Free Shipping Across India</div>
						<div><i class="fas fa-shield-alt" style="color: var(--secondary); margin-right: 8px;"></i> 1-Year Brand Warranty</div>
						<div><i class="fas fa-sync-alt" style="color: var(--accent); margin-right: 8px;"></i> 7-Day Replacement Guarantee</div>
						<div><i class="fas fa-lock" style="color: var(--success); margin-right: 8px;"></i> 256-Bit Encrypted Checkout</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Specifications & Overview Tab -->
		<div class="card-premium" style="margin-top: 30px;">
			<h3 style="font-size: 20px; margin-top: 0; margin-bottom: 18px; display: flex; align-items: center; gap: 10px;">
				<i class="fas fa-align-left" style="color: var(--primary);"></i> Technical Specifications & Overview
			</h3>
			<p style="font-size: 15px; line-height: 1.8; color: var(--text-body); white-space: pre-line;">
				<%=product.getProdInfo()%>
			</p>
		</div>

		<!-- Related Recommendations -->
		<% if (relatedProducts.size() > 1) { %>
		<div style="margin-top: 50px;">
			<h3 style="font-size: 22px; margin-bottom: 20px; text-transform: capitalize;">
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

	</div>

	<%@ include file="footer.html"%>

</body>
</html>


