FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default ROOT application
RUN rm -rf /usr/local/tomcat/webapps/ROOT /usr/local/tomcat/webapps/examples /usr/local/tomcat/webapps/docs

# Copy shopping-cart app as ROOT so site opens directly on main domain
COPY shopping-cart /usr/local/tomcat/webapps/ROOT
COPY shopping-cart /usr/local/tomcat/webapps/shopping-cart

# Expose default HTTP Port 8080
EXPOSE 8080

CMD ["catalina.sh", "run"]
