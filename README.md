# ⚡ Next-Gen Electronics Store E-Commerce Platform

A production-ready, luxury E-Commerce platform built with **Java (JSP, Servlets, JDBC)**, **MariaDB/MySQL**, and modern **CSS3 Glassmorphic UI/UX** inspired by Apple, Samsung, ASUS, Nothing, and Amazon design standards.

---

## ✨ Features & Architecture

### 🛍️ Customer Storefront Experience
- **Sleek Glassmorphism Header**: Sticky glass header with brand logo, live search, mobile navigation, and real-time red shopping cart counter badge.
- **Hero Showcase Section**: High-impact promotional hero banner with category filter pills (Mobiles, Laptops, Smart TVs, Audio, Cameras).
- **Dedicated Product Showcase (`productDetails.jsp`)**: High-res image display, stock level indicator, star ratings, price savings breakdown, technical specs tab, and related category recommendations.
- **Interactive Shopping Cart**: Inline quantity adjustment, item deletion, subtotal calculations, and order summary sidebar.
- **256-Bit Encrypted Checkout**: Simulated 3D credit card preview, input masks, and order processing.
- **Customer Order Tracking**: Order status timeline (`PROCESSING` vs `SHIPPED`).

---

### 🛡️ Admin Management Portal
- **Dashboard Metrics**: Executive overview metric tiles (Total Catalog Count, Stock Levels, Pending Orders).
- **Product Catalog Editor**: Form to upload device images, set unit prices, specs, and quantities.
- **Inventory Matrix**: Real-time stock matrix table with low-stock alerts.
- **1-Click Order Fulfillment**: Unshipped order dispatch panel with single-click shipping controls.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 Glassmorphism, JavaScript (ES6+), Bootstrap, FontAwesome 5 |
| **Typography** | `Plus Jakarta Sans` & `Inter` Google Fonts |
| **Backend Framework** | Java JDK 8+, Java Servlets, JSP |
| **Database** | MariaDB 10.4 / MySQL 8.0 |
| **Application Server** | Apache Tomcat 8.5+ |

---

## 🗃️ Database Setup

1. Open MariaDB / MySQL Command Line or phpMyAdmin.
2. Create and import the schema:
   ```sql
   CREATE DATABASE IF NOT EXISTS `shopping-cart`;
   USE `shopping-cart`;
   ```
3. Import the MariaDB-compatible SQL file: `mysql_database_xampp.sql`.

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access Portal |
|---|---|---|---|
| **Admin** | `admin@gmail.com` | `admin` | `http://localhost:8080/shopping-cart/adminHome.jsp` |
| **Customer** | `guest@gmail.com` | `guest` | `http://localhost:8080/shopping-cart/login.jsp` |

---

## ⚙️ Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmay3671/Electronics-Store-ECommerce-Website.git
   ```
2. Copy `shopping-cart` into Tomcat's `webapps/` directory.
3. Configure `application.properties` with your database credentials.
4. Access `http://localhost:8080/shopping-cart/`.

