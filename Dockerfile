FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default Tomcat webapps
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copy web app into Tomcat
COPY shopping-cart /usr/local/tomcat/webapps/shopping-cart

# Expose HTTP Port
EXPOSE 8080

CMD ["catalina.sh", "run"]
