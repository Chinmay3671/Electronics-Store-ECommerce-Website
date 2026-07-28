FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy shopping-cart app as ROOT and shopping-cart
COPY shopping-cart /usr/local/tomcat/webapps/ROOT
COPY shopping-cart /usr/local/tomcat/webapps/shopping-cart

# Bind Tomcat HTTP connector dynamically to Render's $PORT environment variable
CMD ["sh", "-c", "sed -i \"s/8080/${PORT:-8080}/g\" /usr/local/tomcat/conf/server.xml && catalina.sh run"]
