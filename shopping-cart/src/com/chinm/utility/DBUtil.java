// Author: Electronics Store Engineering
package com.chinm.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class DBUtil {
	private static Connection conn;

	public DBUtil() {
	}

	public static Connection provideConnection() {
		try {
			if (conn == null || conn.isClosed()) {
				String connectionString = "jdbc:mysql://localhost:3306/shopping-cart";
				String driverName = "com.mysql.cj.jdbc.Driver";
				String username = "root";
				String password = "";

				try {
					ResourceBundle rb = ResourceBundle.getBundle("application");
					if (rb != null) {
						if (rb.containsKey("db.connectionString")) connectionString = rb.getString("db.connectionString");
						if (rb.containsKey("db.driverName")) driverName = rb.getString("db.driverName");
						if (rb.containsKey("db.username")) username = rb.getString("db.username");
						if (rb.containsKey("db.password")) password = rb.getString("db.password");
					}
				} catch (Exception e) {
					System.err.println("ResourceBundle Notice: " + e.getMessage());
				}

				String envConn = System.getenv("DB_CONNECTION_STRING");
				String envDriver = System.getenv("DB_DRIVER");
				String envUser = System.getenv("DB_USER");
				String envPass = System.getenv("DB_PASS");

				if (envConn != null && !envConn.trim().isEmpty()) connectionString = envConn;
				if (envDriver != null && !envDriver.trim().isEmpty()) driverName = envDriver;
				if (envUser != null && !envUser.trim().isEmpty()) username = envUser;
				if (envPass != null && !envPass.trim().isEmpty()) password = envPass;

				try {
					Class.forName(driverName);
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}

				try {
					conn = DriverManager.getConnection(connectionString, username, password);
				} catch (SQLException sqle) {
					System.err.println("Database Unreachable Warning: " + sqle.getMessage());
					conn = null;
				}
			}
		} catch (Exception e) {
			System.err.println("DB Connection Notice: " + e.getMessage());
			conn = null;
		}

		return conn;
	}

	public static void closeConnection(Connection con) {
		try {
			if (con != null && !con.isClosed()) {
				con.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void closeConnection(ResultSet rs) {
		try {
			if (rs != null && !rs.isClosed()) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void closeConnection(PreparedStatement ps) {
		try {
			if (ps != null && !ps.isClosed()) {
				try {
					ps.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
