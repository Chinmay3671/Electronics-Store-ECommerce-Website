<%-- Electronics Store UI/UX Redesign --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="com.chinm.service.impl.*,com.chinm.service.*,com.chinm.beans.*,java.util.*,javax.servlet.ServletOutputStream,java.io.*"%>
<!DOCTYPE html>
<html>
<head>
<title>Electronics Store | Catalog</title>
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

	if (userName == null || password == null) {
		response.sendRedirect("login.jsp?message=Session Expired, Login Again!!");
	}

	ProductServiceImpl prodDao = new ProductServiceImpl();
	List<ProductBean> products = new ArrayList<ProductBean>();

	String search = request.getParameter("search");
	String type = request.getParameter("type");
	String message = "All Products";
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
						<i class="fas fa-user-check" style="color: #10B981;"></i> Welcome Back, <%=userName != null ? userName.split("@")[0] : "Customer"%>!
					</div>
					<h1 class="hero-title">
						Explore Exclusive<br/>Tech Deals Today.
					</h1>
					<p class="hero-subtitle">
						Access special member pricing, fast checkout, and priority shipping on flagship gadgets.
					</p>
					<div style="display: flex; gap: 14px; flex-wrap: wrap;">
						<a href="#catalog" class="btn-premium-primary" style="padding: 12px 28px !important; font-size: 15px !important;">
							<i class="fas fa-shopping-bag"></i> Browse Products
						</a>
						<a href="cartDetails.jsp" class="btn-premium-secondary" style="padding: 12px 24px !important; font-size: 15px !important;">
							<i class="fas fa-shopping-cart"></i> View My Cart
						</a>
					</div>
				</div>
				<div class="col-md-5 col-sm-12 hidden-xs text-center">
					<div style="position: relative; display: inline-block;">
						<div style="width: 280px; height: 280px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2)); border-radius: 50%; filter: blur(30px); position: absolute; top: 0; left: 0;"></div>
						<i class="fas fa-mobile-alt" style="font-size: 160px; color: rgba(255,255,255,0.9); position: relative; z-index: 2; text-shadow: 0 20px 40px rgba(0,0,0,0.5);"></i>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Product Store Catalog -->
	<div class="container" id="catalog" style="margin-bottom: 60px;">
		
		<!-- Section Header & Category Pills -->
		<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 25px; gap: 15px;">
			<div>
				<h2 style="font-size: 28px; margin: 0; text-transform: capitalize;"><%=message%></h2>
				<p style="color: var(--text-muted); margin: 4px 0 0 0; font-size: 14px;">Shop premium devices with official brand warranty</p>
			</div>

			<!-- Category Filter Pills -->
			<div class="category-filter-bar" style="margin-bottom: 0;">
				<a href="userHome.jsp#catalog" class="cat-pill-btn <%=type == null && search == null ? "cat-pill-active" : ""%>">
					<i class="fas fa-border-all"></i> All
				</a>
				<a href="userHome.jsp?type=mobile#catalog" class="cat-pill-btn <%="mobile".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-mobile-alt"></i> Mobiles
				</a>
				<a href="userHome.jsp?type=laptop#catalog" class="cat-pill-btn <%="laptop".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-laptop"></i> Laptops
				</a>
				<a href="userHome.jsp?type=tv#catalog" class="cat-pill-btn <%="tv".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-tv"></i> TVs
				</a>
				<a href="userHome.jsp?type=speaker#catalog" class="cat-pill-btn <%="speaker".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
					<i class="fas fa-volume-up"></i> Audio
				</a>
				<a href="userHome.jsp?type=camera#catalog" class="cat-pill-btn <%="camera".equalsIgnoreCase(type) ? "cat-pill-active" : ""%>">
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


