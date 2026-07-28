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
				ResourceBundle rb = ResourceBundle.getBundle("application");

				String envConn = System.getenv("DB_CONNECTION_STRING");
				String envDriver = System.getenv("DB_DRIVER");
				String envUser = System.getenv("DB_USER");
				String envPass = System.getenv("DB_PASS");

				String connectionString = (envConn != null && !envConn.trim().isEmpty()) ? envConn : rb.getString("db.connectionString");
				String driverName = (envDriver != null && !envDriver.trim().isEmpty()) ? envDriver : rb.getString("db.driverName");
				String username = (envUser != null && !envUser.trim().isEmpty()) ? envUser : rb.getString("db.username");
				String password = (envPass != null && !envPass.trim().isEmpty()) ? envPass : rb.getString("db.password");

				try {
					Class.forName(driverName);
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}
				conn = DriverManager.getConnection(connectionString, username, password);
			}
		} catch (SQLException e) {
			System.err.println("DB Connection Warning: " + e.getMessage());
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
