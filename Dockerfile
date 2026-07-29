FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default Tomcat applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy WebContent into ROOT and shopping-cart
COPY shopping-cart/WebContent /usr/local/tomcat/webapps/ROOT
COPY shopping-cart/WebContent /usr/local/tomcat/webapps/shopping-cart

# Ensure application.properties is copied into WEB-INF/classes for ResourceBundle
COPY shopping-cart/src/application.properties /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/application.properties
COPY shopping-cart/src/application.properties /usr/local/tomcat/webapps/shopping-cart/WEB-INF/classes/application.properties

# Bind Tomcat HTTP connector dynamically to Render's $PORT environment variable
EXPOSE 8080 10000
CMD ["sh", "-c", "if [ -n \"$PORT\" ]; then sed -i \"s/8080/$PORT/g\" /usr/local/tomcat/conf/server.xml; fi; exec catalina.sh run"]
