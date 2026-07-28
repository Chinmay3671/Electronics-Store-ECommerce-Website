// Author: Electronics Store Engineering
package com.chinm.utility;

import java.util.Properties;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

public class JavaMailUtil {
	public static void sendMail(String recipientMailId) throws MessagingException {
		try {
			System.out.println("Preparing to send Mail");
			Properties properties = new Properties();
			String host = "smtp.gmail.com";
			properties.put("mail.smtp.host", host);
			properties.put("mail.transport.protocol", "smtp");
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.smtp.port", "587");

			String emailId = "noreply@electronicsstore.com";
			String passWord = "";

			try {
				ResourceBundle rb = ResourceBundle.getBundle("application");
				if (rb != null) {
					if (rb.containsKey("mailer.email")) emailId = rb.getString("mailer.email");
					if (rb.containsKey("mailer.password")) passWord = rb.getString("mailer.password");
				}
			} catch (Exception e) {
				System.err.println("ResourceBundle Notice: " + e.getMessage());
			}

			final String mailUser = emailId;
			final String mailPass = passWord;

			properties.put("mail.user", mailUser);
			properties.put("mail.password", mailPass);

			Session session = Session.getInstance(properties, new Authenticator() {
				@Override
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(mailUser, mailPass);
				}
			});

			Message message = prepareMessage(session, mailUser, recipientMailId);
			if (message != null) {
				Transport.send(message);
				System.out.println("Message Sent Successfully!");
			}
		} catch (Throwable t) {
			System.err.println("Mail sending failed safely without crashing app: " + t.getMessage());
		}
	}

	private static Message prepareMessage(Session session, String myAccountEmail, String recipientEmail) {
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(myAccountEmail));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
			message.setSubject("Welcome to Electronics Store");
			message.setText("Hey! " + recipientEmail + ", Thanks for Signing Up with us!");
			return message;
		} catch (Exception exception) {
			Logger.getLogger(JavaMailUtil.class.getName()).log(Level.SEVERE, null, exception);
		}
		return null;
	}

	protected static void sendMail(String recipient, String subject, String htmlTextMessage) throws MessagingException {
		try {
			System.out.println("Preparing to send Mail");
			Properties properties = new Properties();
			String host = "smtp.gmail.com";
			properties.put("mail.smtp.host", host);
			properties.put("mail.transport.protocol", "smtp");
			properties.put("mail.smtp.auth", "true");
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.smtp.port", "587");

			String emailId = "noreply@electronicsstore.com";
			String passWord = "";

			try {
				ResourceBundle rb = ResourceBundle.getBundle("application");
				if (rb != null) {
					if (rb.containsKey("mailer.email")) emailId = rb.getString("mailer.email");
					if (rb.containsKey("mailer.password")) passWord = rb.getString("mailer.password");
				}
			} catch (Exception e) {
				System.err.println("ResourceBundle Notice: " + e.getMessage());
			}

			final String mailUser = emailId;
			final String mailPass = passWord;

			properties.put("mail.user", mailUser);
			properties.put("mail.password", mailPass);

			Session session = Session.getInstance(properties, new Authenticator() {
				@Override
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(mailUser, mailPass);
				}
			});

			Message message = prepareMessage(session, mailUser, recipient, subject, htmlTextMessage);
			if (message != null) {
				Transport.send(message);
				System.out.println("Message Sent Successfully!");
			}
		} catch (Throwable t) {
			System.err.println("Mail sending failed safely without crashing app: " + t.getMessage());
		}
	}

	private static Message prepareMessage(Session session, String myAccountEmail, String recipientEmail, String subject,
			String htmlTextMessage) {
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(myAccountEmail));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
			message.setSubject(subject);
			message.setContent(htmlTextMessage, "text/html");
			return message;
		} catch (Exception exception) {
			Logger.getLogger(JavaMailUtil.class.getName()).log(Level.SEVERE, null, exception);
		}
		return null;
	}
}
