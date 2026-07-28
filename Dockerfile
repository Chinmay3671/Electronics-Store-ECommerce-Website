FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default Tomcat webapps
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Disable Tomcat shutdown port so cloud health checks don't trigger shutdown
RUN sed -i 's/port="8005" shutdown="SHUTDOWN"/port="-1" shutdown="NOPERM"/g' /usr/local/tomcat/conf/server.xml

# Copy web app into Tomcat
COPY shopping-cart /usr/local/tomcat/webapps/shopping-cart

# Expose HTTP Port
EXPOSE 8080

CMD ["catalina.sh", "run"]
