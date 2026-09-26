# Multi-stage Dockerfile optimized for Render.com (512MB RAM Limit)
FROM maven:3.8.6-openjdk-11-slim AS build
WORKDIR /app

# Copy Maven POM and source
COPY shopping-cart /app/shopping-cart

# Package WAR file
RUN cd /app/shopping-cart && mvn clean package -DskipTests

# Runtime stage: Tomcat 9 on Java 11
FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default Tomcat webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy compiled WAR file as both ROOT.war and shopping-cart.war
COPY --from=build /app/shopping-cart/target/*.war /usr/local/tomcat/webapps/ROOT.war
COPY --from=build /app/shopping-cart/target/*.war /usr/local/tomcat/webapps/shopping-cart.war

# Set Memory limits for Render's 512MB free tier to prevent OOM and eliminate entropy delay
ENV JAVA_OPTS="-Xms128m -Xmx350m -XX:+UseSerialGC -Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom"

EXPOSE 8080 10000

# Bind Tomcat to Render dynamic $PORT
CMD ["sh", "-c", "PORT_TO_USE=${PORT:-8080}; sed -i \"s/port=\\\"8080\\\"/port=\\\"${PORT_TO_USE}\\\"/g\" /usr/local/tomcat/conf/server.xml; exec catalina.sh run"]
