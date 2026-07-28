<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Electronics Store | Next-Gen Tech & Accessories</title>
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
<body>

	<%
	/* Checking the user credentials */
	String userName = (String) session.getAttribute("username");
	String password = (String) session.getAttribute("password");
	String userType = (String) session.getAttribute("usertype");

	boolean isValidUser = true;

	if (userType == null || userName == null || password == null || !userType.equals("customer")) {
		isValidUser = false;
	}

	ProductServiceImpl prodDao = new ProductServiceImpl();
	List<ProductBean> products = new ArrayList<ProductBean>();

	String search = request.getParameter("search");
	String type = request.getParameter("type");
	String message = "Featured Electronics";
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

	<!-- Hero Banner Section -->
	<section class="hero-section-premium animate-fade-in">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-md-7 col-sm-12">
					<div class="hero-pill-badge">
						<i class="fas fa-fire" style="color: #F59E0B;"></i> Summer Sale - Extra 15% OFF
					</div>
					<h1 class="hero-title">
						Next-Gen Electronics.<br/>Designed for Power.
					</h1>
					<p class="hero-subtitle">
						Discover cutting-edge smartphones, ultra-thin laptops, smart TVs, and pro audio gear engineered for peak performance.
					</p>
					<div style="display: flex; gap: 14px; flex-wrap: wrap;">
						<a href="#catalog" class="btn-premium-primary" style="padding: 12px 28px !important; font-size: 15px !important;">
							<i class="fas fa-shopping-bag"></i> Explore Catalog
						</a>
						<a href="index.jsp?type=laptop#catalog" class="btn-premium-secondary" style="padding: 12px 24px !important; font-size: 15px !important;">
							<i class="fas fa-laptop"></i> View Laptops
						</a>
					</div>
				</div>
				<div class="col-md-5 col-sm-12 hidden-xs text-center">
					<div style="position: relative; display: inline-block;">
						<div style="width: 280px; height: 280px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2)); border-radius: 50%; filter: blur(30px); position: absolute; top: 0; left: 0;"></div>
						<i class="fas fa-laptop-code" style="font-size: 160px; color: rgba(255,255,255,0.9); position: relative; z-index: 2; text-shadow: 0 20px 40px rgba(0,0,0,0.5);"></i>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Feature Highlights Bar -->
	<div class="container">
		<div class="features-bar-premium">
			<div class="feature-box-premium">
				<div class="feature-icon-wrapper">
					<i class="fas fa-shipping-fast"></i>
				</div>
				<div>
					<h4 class="feature-title">Free Express Shipping</h4>
					<p class="feature-desc">On orders over Rs. 999 across India</p>
				</div>
			</div>

			<div class="feature-box-premium">
				<div class="feature-icon-wrapper" style="color: var(--secondary); background: rgba(124, 58, 237, 0.1);">
					<i class="fas fa-shield-alt"></i>
				</div>
				<div>
					<h4 class="feature-title">100% Brand Guarantee</h4>
					<p class="feature-desc">Authentic products with warranty</p>
				</div>
			</div>

			<div class="feature-box-premium">
				<div class="feature-icon-wrapper" style="color: var(--accent); background: rgba(6, 182, 212, 0.1);">
					<i class="fas fa-undo-alt"></i>
				</div>
				<div>
					<h4 class="feature-title">7-Day Easy Returns</h4>
					<p class="feature-desc">Hassle-free replacement policy</p>
				</div>
			</div>

			<div class="feature-box-premium">
				<div class="feature-icon-wrapper" style="color: var(--success); background: rgba(16, 185, 129, 0.1);">
					<i class="fas fa-headset"></i>
				</div>
				<div>
					<h4 class="feature-title">24/7 Dedicated Support</h4>
					<p class="feature-desc">Instant customer assistance</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Product Store Catalog -->
	<div class="container" id="catalog" style="margin-bottom: 60px;">
		
		<!-- Section Header & Category Pills -->
		<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 25px; gap: 15px;">
			<div>
				<h2 style="font-size: 28px; margin: 0; text-transform: capitalize;"><%=message%></h2>
				<p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 14px;">Handpicked high-tech products for your modern lifestyle</p>
			</div>

			<!-- Category Filter Pills -->
			<div class="category-filter-bar" style="margin-bottom: 0;">
				<a href="index.jsp#catalog" class="cat-pill-btn <%=type == null && search == null ? "cat-pill-active" : ""%>">
					<i class="fas fa-border-all"></i> All
				</a>
				<a href="index.jsp?type=mobile#catalog" class="cat-pill-btn <%="mobile".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-mobile-alt"></i> Mobiles
				</a>
				<a href="index.jsp?type=laptop#catalog" class="cat-pill-btn <%="laptop".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-laptop"></i> Laptops
				</a>
				<a href="index.jsp?type=tv#catalog" class="cat-pill-btn <%="tv".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-tv"></i> TVs
				</a>
				<a href="index.jsp?type=speaker#catalog" class="cat-pill-btn <%="speaker".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-volume-up"></i> Audio
				</a>
				<a href="index.jsp?type=camera#catalog" class="cat-pill-btn <%="camera".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-camera"></i> Cameras
				</a>
			</div>
		</div>

		<!-- Product Grid -->
		<div class="row">
			<%
			for (ProductBean product : products) {
				int cartQty = new CartServiceImpl().getCartItemCount(userName, product.getProdId());
			%>
			<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
				<div class="product-card-premium">
					<div class="product-img-wrapper">
						<span class="product-tag-category"><%=product.getProdType()%></span>
						<a href="productDetails.jsp?pid=<%=product.getProdId()%>">
							<img src="./ShowImage?pid=<%=product.getProdId()%>" alt="<%=product.getProdName()%>" loading="lazy">
						</a>
					</div>

					<div class="product-title-premium">
						<a href="productDetails.jsp?pid=<%=product.getProdId()%>" style="color: var(--text-heading); text-decoration: none;">
							<%=product.getProdName()%>
						</a>
					</div>
					
					<%
					String description = product.getProdInfo();
					description = description.substring(0, Math.min(description.length(), 90));
					%>
					<div class="product-desc-premium"><%=description%>...</div>

					<div class="product-price-row">
						<div>
							<span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; display: block;">Price</span>
							<span class="product-price-amount">
								<span class="product-price-currency">Rs.</span><%=String.format("%.2f", product.getProdPrice())%>
							</span>
						</div>
						<div style="color: var(--warning); font-size: 13px; font-weight: 600;">
							<i class="fas fa-star"></i> 4.8
						</div>
					</div>

					<form method="post">
						<%
						if (cartQty == 0) {
						%>
						<div class="product-btn-group">
							<button type="submit"
								formaction="./AddtoCart?uid=<%=userName%>&pid=<%=product.getProdId()%>&pqty=1"
								class="btn-premium-secondary">
								<i class="fas fa-cart-plus"></i> Add to Cart
							</button>
							<button type="submit"
								formaction="./AddtoCart?uid=<%=userName%>&pid=<%=product.getProdId()%>&pqty=1"
								class="btn-premium-primary">
								<i class="fas fa-bolt"></i> Buy Now
							</button>
						</div>
						<%
						} else {
						%>
						<div class="product-btn-group">
							<button type="submit"
								formaction="./AddtoCart?uid=<%=userName%>&pid=<%=product.getProdId()%>&pqty=0"
								class="btn-premium-danger">
								<i class="fas fa-trash-alt"></i> Remove
							</button>
							<button type="submit" formaction="cartDetails.jsp"
								class="btn-premium-primary">
								<i class="fas fa-shopping-bag"></i> Checkout
							</button>
						</div>
						<%
						}
						%>
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


