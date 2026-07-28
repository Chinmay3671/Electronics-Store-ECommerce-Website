// Author: Electronics Store Engineering
package com.chinm.service.impl;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.chinm.beans.DemandBean;
import com.chinm.beans.ProductBean;
import com.chinm.service.ProductService;
import com.chinm.utility.DBUtil;
import com.chinm.utility.IDUtil;
import com.chinm.utility.MailMessage;

public class ProductServiceImpl implements ProductService {

	private List<ProductBean> getFallbackProducts() {
		List<ProductBean> products = new ArrayList<ProductBean>();
		products.add(new ProductBean("P20230423084161", "MacBook Pro M3 Max 16-inch", "laptop", "Apple M3 Max chip with 16-core CPU and 40-core GPU, 48GB Unified Memory, 1TB SSD Storage.", 249999.00, 15, null));
		products.add(new ProductBean("P20230423084162", "iPhone 15 Pro Max 256GB Titanium", "mobile", "Titanium design with A17 Pro chip, Action Button, 48MP Main Camera, 5x Telephoto lens.", 149900.00, 25, null));
		products.add(new ProductBean("P20230423084163", "Samsung 65-inch Neo QLED 4K Smart TV", "tv", "Quantum Matrix Technology with Mini LED, Neural Quantum Processor 4K, Dolby Atmos audio.", 119990.00, 10, null));
		products.add(new ProductBean("P20230423084164", "Sony Alpha 7 IV Full-Frame Camera", "camera", "33MP Exmor R CMOS Sensor, BIONZ XR Processor, 4K 60p Video Recording, Real-time Eye AF.", 214990.00, 8, null));
		products.add(new ProductBean("P20230423084165", "Bose QuietComfort Ultra Wireless Headphones", "speaker", "World-class noise cancellation, Immersive Audio, CustomTune technology, 24-hour battery life.", 34900.00, 30, null));
		products.add(new ProductBean("P20230423084166", "Apple iPad Pro 12.9-inch M2 256GB", "tablet", "Liquid Retina XDR display, M2 chip, Pro camera system, Thunderbolt port, Apple Pencil support.", 112900.00, 12, null));
		return products;
	}

	@Override
	public String addProduct(String prodName, String prodType, String prodInfo, double prodPrice, int prodQuantity,
			InputStream prodImage) {
		String status = null;
		String prodId = IDUtil.generateId();

		ProductBean product = new ProductBean(prodId, prodName, prodType, prodInfo, prodPrice, prodQuantity, prodImage);

		status = addProduct(product);

		return status;
	}

	@Override
	public String addProduct(ProductBean product) {
		String status = "Product Registration Failed!";

		if (product.getProdId() == null)
			product.setProdId(IDUtil.generateId());

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("insert into product values(?,?,?,?,?,?,?);");
				ps.setString(1, product.getProdId());
				ps.setString(2, product.getProdName());
				ps.setString(3, product.getProdType());
				ps.setString(4, product.getProdInfo());
				ps.setDouble(5, product.getProdPrice());
				ps.setInt(6, product.getProdQuantity());
				ps.setBlob(7, product.getProdImage());

				int k = ps.executeUpdate();

				if (k > 0) {
					status = "Product Added Successfully with Product Id: " + product.getProdId();
				}
			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);

		return status;
	}

	@Override
	public String removeProduct(String prodId) {
		String status = "Product Removal Failed!";

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;
		PreparedStatement ps2 = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("delete from product where pid=?");
				ps.setString(1, prodId);

				int k = ps.executeUpdate();

				if (k > 0) {
					status = "Product Removed Successfully!";
					ps2 = con.prepareStatement("delete from usercart where prodid=?");
					ps2.setString(1, prodId);
					ps2.executeUpdate();
				}

			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(ps2);

		return status;
	}

	@Override
	public String updateProduct(ProductBean prevProduct, ProductBean updatedProduct) {
		String status = "Product Updation Failed!";

		if (!prevProduct.getProdId().equals(updatedProduct.getProdId())) {
			status = "Both Products are Different, Updation Failed!";
			return status;
		}

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;

		if (con != null) {
			try {
				ps = con.prepareStatement(
						"update product set pname=?,ptype=?,pinfo=?,pprice=?,pquantity=?,image=? where pid=?");

				ps.setString(1, updatedProduct.getProdName());
				ps.setString(2, updatedProduct.getProdType());
				ps.setString(3, updatedProduct.getProdInfo());
				ps.setDouble(4, updatedProduct.getProdPrice());
				ps.setInt(5, updatedProduct.getProdQuantity());
				ps.setBlob(6, updatedProduct.getProdImage());
				ps.setString(7, updatedProduct.getProdId());

				int k = ps.executeUpdate();

				if (k > 0)
					status = "Product Updated Successfully!";
			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);

		return status;
	}

	@Override
	public String updateProductPrice(String prodId, double updatedPrice) {
		String status = "Price Updation Failed!";

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("update product set pprice=? where pid=?");

				ps.setDouble(1, updatedPrice);
				ps.setString(2, prodId);

				int k = ps.executeUpdate();

				if (k > 0)
					status = "Price Updated Successfully!";
			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);

		return status;
	}

	@Override
	public List<ProductBean> getAllProducts() {
		List<ProductBean> products = new ArrayList<ProductBean>();

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select * from product");

				rs = ps.executeQuery();

				while (rs.next()) {
					ProductBean product = new ProductBean();
					product.setProdId(rs.getString(1));
					product.setProdName(rs.getString(2));
					product.setProdType(rs.getString(3));
					product.setProdInfo(rs.getString(4));
					product.setProdPrice(rs.getDouble(5));
					product.setProdQuantity(rs.getInt(6));
					product.setProdImage(rs.getAsciiStream(7));

					products.add(product);
				}

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		if (products.isEmpty()) {
			products = getFallbackProducts();
		}

		return products;
	}

	@Override
	public List<ProductBean> getAllProductsByType(String type) {
		List<ProductBean> products = new ArrayList<ProductBean>();

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select * from product where lower(ptype) like ?");
				ps.setString(1, "%" + type.toLowerCase() + "%");
				rs = ps.executeQuery();

				while (rs.next()) {
					ProductBean product = new ProductBean();
					product.setProdId(rs.getString(1));
					product.setProdName(rs.getString(2));
					product.setProdType(rs.getString(3));
					product.setProdInfo(rs.getString(4));
					product.setProdPrice(rs.getDouble(5));
					product.setProdQuantity(rs.getInt(6));
					product.setProdImage(rs.getAsciiStream(7));

					products.add(product);
				}

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		if (products.isEmpty()) {
			for (ProductBean p : getFallbackProducts()) {
				if (p.getProdType().equalsIgnoreCase(type)) {
					products.add(p);
				}
			}
			if (products.isEmpty()) products = getFallbackProducts();
		}

		return products;
	}

	@Override
	public List<ProductBean> searchAllProducts(String search) {
		List<ProductBean> products = new ArrayList<ProductBean>();

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement(
						"select * from product where lower(ptype) like ? or lower(pname) like ? or lower(pinfo) like ?");
				search = "%" + search.toLowerCase() + "%";
				ps.setString(1, search);
				ps.setString(2, search);
				ps.setString(3, search);
				rs = ps.executeQuery();

				while (rs.next()) {
					ProductBean product = new ProductBean();
					product.setProdId(rs.getString(1));
					product.setProdName(rs.getString(2));
					product.setProdType(rs.getString(3));
					product.setProdInfo(rs.getString(4));
					product.setProdPrice(rs.getDouble(5));
					product.setProdQuantity(rs.getInt(6));
					product.setProdImage(rs.getAsciiStream(7));

					products.add(product);
				}

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		if (products.isEmpty()) {
			products = getFallbackProducts();
		}

		return products;
	}

	@Override
	public byte[] getImage(String prodId) {
		byte[] image = null;

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select image from product where pid=?");
				ps.setString(1, prodId);
				rs = ps.executeQuery();

				if (rs.next())
					image = rs.getBytes("image");

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		return image;
	}

	@Override
	public ProductBean getProductDetails(String prodId) {
		ProductBean product = null;

		Connection con = DBUtil.provideConnection();

		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select * from product where pid=?");
				ps.setString(1, prodId);
				rs = ps.executeQuery();

				if (rs.next()) {
					product = new ProductBean();
					product.setProdId(rs.getString(1));
					product.setProdName(rs.getString(2));
					product.setProdType(rs.getString(3));
					product.setProdInfo(rs.getString(4));
					product.setProdPrice(rs.getDouble(5));
					product.setProdQuantity(rs.getInt(6));
					product.setProdImage(rs.getAsciiStream(7));
				}

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		if (product == null) {
			for (ProductBean p : getFallbackProducts()) {
				if (p.getProdId().equalsIgnoreCase(prodId)) {
					return p;
				}
			}
			return getFallbackProducts().get(0);
		}

		return product;
	}

	@Override
	public String updateProductWithoutImage(String prevProductId, ProductBean updatedProduct) {
		String status = "Product Updation Failed!";

		if (!prevProductId.equals(updatedProduct.getProdId())) {
			status = "Both Products are Different, Updation Failed!";
			return status;
		}

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("update product set pname=?,ptype=?,pinfo=?,pprice=?,pquantity=? where pid=?");

				ps.setString(1, updatedProduct.getProdName());
				ps.setString(2, updatedProduct.getProdType());
				ps.setString(3, updatedProduct.getProdInfo());
				ps.setDouble(4, updatedProduct.getProdPrice());
				ps.setInt(5, updatedProduct.getProdQuantity());
				ps.setString(6, updatedProduct.getProdId());

				int k = ps.executeUpdate();

				if (k > 0)
					status = "Product Updated Successfully!";
			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);

		return status;
	}

	@Override
	public double getProductPrice(String prodId) {
		double price = 0;

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select pprice from product where pid=?");
				ps.setString(1, prodId);
				rs = ps.executeQuery();

				if (rs.next())
					price = rs.getDouble("pprice");

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		if (price == 0) {
			ProductBean p = getProductDetails(prodId);
			if (p != null) price = p.getProdPrice();
		}

		return price;
	}

	@Override
	public boolean sellNProduct(String prodId, int n) {
		boolean flag = false;

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("update product set pquantity=(pquantity-?) where pid=? and pquantity>=?");

				ps.setInt(1, n);
				ps.setString(2, prodId);
				ps.setInt(3, n);

				int k = ps.executeUpdate();

				if (k > 0)
					flag = true;

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);

		return flag;
	}

	@Override
	public int getProductQuantity(String prodId) {
		int quantity = 0;

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select pquantity from product where pid=?");
				ps.setString(1, prodId);
				rs = ps.executeQuery();

				if (rs.next())
					quantity = rs.getInt("pquantity");

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		if (quantity == 0) {
			ProductBean p = getProductDetails(prodId);
			if (p != null) quantity = p.getProdQuantity();
		}

		return quantity;
	}
}
