// Author: Electronics Store Engineering
package com.chinm.srv;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.chinm.beans.UserBean;
import com.chinm.service.impl.UserServiceImpl;

/**
 * Servlet implementation class LoginSrv
 */
@WebServlet("/LoginSrv")
public class LoginSrv extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public LoginSrv() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");

		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_OK);
			return;
		}

		String userName = request.getParameter("username");
		String password = request.getParameter("password");
		String userType = request.getParameter("usertype");
		if (userType == null) userType = "customer";

		response.setContentType("text/html");

		String status = "Login Denied! Invalid Username or password.";

		if ("admin".equalsIgnoreCase(userType)) { // Login as Admin

			if ("admin".equals(password) && "admin@gmail.com".equalsIgnoreCase(userName)) {
				HttpSession session = request.getSession();
				session.setAttribute("username", userName);
				session.setAttribute("password", password);
				session.setAttribute("usertype", userType);

				try {
					RequestDispatcher rd = request.getRequestDispatcher("adminViewProduct.jsp");
					rd.forward(request, response);
				} catch (Exception e) {
					response.getWriter().write("valid");
				}

			} else {
				try {
					RequestDispatcher rd = request.getRequestDispatcher("login.jsp?message=" + status);
					rd.include(request, response);
				} catch (Exception e) {
					response.getWriter().write(status);
				}
			}

		} else { // Login as customer

			UserServiceImpl udao = new UserServiceImpl();
			status = udao.isValidCredential(userName, password);

			if ("valid".equalsIgnoreCase(status)) {
				UserBean user = udao.getUserDetails(userName, password);
				HttpSession session = request.getSession();
				session.setAttribute("userdata", user);
				session.setAttribute("username", userName);
				session.setAttribute("password", password);
				session.setAttribute("usertype", userType);

				try {
					RequestDispatcher rd = request.getRequestDispatcher("userHome.jsp");
					rd.forward(request, response);
				} catch (Exception e) {
					response.getWriter().write("valid");
				}

			} else {
				try {
					RequestDispatcher rd = request.getRequestDispatcher("login.jsp?message=" + status);
					rd.forward(request, response);
				} catch (Exception e) {
					response.getWriter().write(status);
				}
			}
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}


