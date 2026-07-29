// Author: Electronics Store Engineering
package com.chinm.srv;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chinm.beans.UserBean;
import com.chinm.service.impl.UserServiceImpl;

/**
 * Servlet implementation class RegisterSrv
 */
@WebServlet("/RegisterSrv")
public class RegisterSrv extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setContentType("text/html");

		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_OK);
			return;
		}

		String emailId = request.getParameter("email");
		if (emailId == null || emailId.trim().isEmpty()) {
			return;
		}

		String userName = request.getParameter("username");
		if (userName == null || userName.trim().isEmpty()) {
			userName = emailId.contains("@") ? emailId.split("@")[0] : emailId;
		}

		String mobileStr = request.getParameter("mobile");
		Long mobileNo = 9876543210L;
		if (mobileStr != null && !mobileStr.trim().isEmpty()) {
			try {
				mobileNo = Long.parseLong(mobileStr.replaceAll("[^0-9]", ""));
			} catch (Exception e) {
				mobileNo = 9876543210L;
			}
		}

		String address = request.getParameter("address");
		if (address == null || address.trim().isEmpty()) {
			address = "Customer Address";
		}

		String pinStr = request.getParameter("pincode");
		int pinCode = 400001;
		if (pinStr != null && !pinStr.trim().isEmpty()) {
			try {
				pinCode = Integer.parseInt(pinStr.replaceAll("[^0-9]", ""));
			} catch (Exception e) {
				pinCode = 400001;
			}
		}

		String password = request.getParameter("password");
		if (password == null) password = "";

		String confirmPassword = request.getParameter("confirmPassword");
		if (confirmPassword == null) confirmPassword = password;

		String status = "";
		if (password.equals(confirmPassword)) {
			UserBean user = new UserBean(userName, mobileNo, emailId, address, pinCode, password);
			UserServiceImpl dao = new UserServiceImpl();
			status = dao.registerUser(user);
		} else {
			status = "Password not matching!";
		}

		RequestDispatcher rd = request.getRequestDispatcher("register.jsp?message=" + status);
		try {
			rd.forward(request, response);
		} catch (Exception e) {
			response.getWriter().write(status);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}


