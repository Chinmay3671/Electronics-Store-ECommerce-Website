// Author: Electronics Store Engineering
package com.chinm.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.chinm.beans.UserBean;
import com.chinm.constants.IUserConstants;
import com.chinm.service.UserService;
import com.chinm.utility.DBUtil;
import com.chinm.utility.MailMessage;

public class UserServiceImpl implements UserService {

	@Override
	public String registerUser(String userName, Long mobileNo, String emailId, String address, int pinCode,
			String password) {
		UserBean user = new UserBean(userName, mobileNo, emailId, address, pinCode, password);
		return registerUser(user);
	}

	@Override
	public String registerUser(UserBean user) {
		String status = "User Registration Failed!";

		boolean isRegtd = isRegistered(user.getEmail());

		if (isRegtd) {
			status = "Email Id Already Registered!";
			return status;
		}

		Connection conn = DBUtil.provideConnection();
		PreparedStatement ps = null;

		if (conn != null) {
			try {
				ps = conn.prepareStatement("insert into " + IUserConstants.TABLE_USER + " values(?,?,?,?,?,?)");
				ps.setString(1, user.getEmail());
				ps.setString(2, user.getName());
				ps.setLong(3, user.getMobile());
				ps.setString(4, user.getAddress());
				ps.setInt(5, user.getPinCode());
				ps.setString(6, user.getPassword());

				int k = ps.executeUpdate();

				if (k > 0) {
					status = "User Registered Successfully!";
					try {
						MailMessage.registrationSuccess(user.getEmail(), user.getName().split(" ")[0]);
					} catch (Exception e) {
						System.err.println("Mail notice skipped: " + e.getMessage());
					}
				}
			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(conn);
		DBUtil.closeConnection(ps);

		return status;
	}

	@Override
	public boolean isRegistered(String emailId) {
		boolean flag = false;

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select * from " + IUserConstants.TABLE_USER + " where email=?");
				ps.setString(1, emailId);
				rs = ps.executeQuery();

				if (rs.next())
					flag = true;

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		return flag;
	}

	@Override
	public String isValidCredential(String emailId, String password) {
		String status = "Invalid Username or Password!";

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select * from " + IUserConstants.TABLE_USER + " where email=? and password=?");
				ps.setString(1, emailId);
				ps.setString(2, password);

				rs = ps.executeQuery();

				if (rs.next())
					status = "Valid";

			} catch (SQLException e) {
				status = "Error: " + e.getMessage();
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		return status;
	}

	@Override
	public UserBean getUserDetails(String emailId, String password) {
		UserBean user = null;

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select * from " + IUserConstants.TABLE_USER + " where email=? and password=?");
				ps.setString(1, emailId);
				ps.setString(2, password);

				rs = ps.executeQuery();

				if (rs.next()) {
					user = new UserBean();
					user.setName(rs.getString("name"));
					user.setMobile(rs.getLong("mobile"));
					user.setEmail(rs.getString("email"));
					user.setAddress(rs.getString("address"));
					user.setPinCode(rs.getInt("pincode"));
					user.setPassword(rs.getString("password"));
				}

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		return user;
	}

	@Override
	public String getFName(String emailId) {
		String fname = "";

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select name from " + IUserConstants.TABLE_USER + " where email=?");
				ps.setString(1, emailId);

				rs = ps.executeQuery();

				if (rs.next()) {
					fname = rs.getString(1).split(" ")[0];
				}

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		return fname;
	}

	@Override
	public String getUserAddr(String userId) {
		String userAddr = "";

		Connection con = DBUtil.provideConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		if (con != null) {
			try {
				ps = con.prepareStatement("select address from " + IUserConstants.TABLE_USER + " where email=?");
				ps.setString(1, userId);

				rs = ps.executeQuery();

				if (rs.next())
					userAddr = rs.getString(1);

			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		DBUtil.closeConnection(con);
		DBUtil.closeConnection(ps);
		DBUtil.closeConnection(rs);

		return userAddr;
	}
}
