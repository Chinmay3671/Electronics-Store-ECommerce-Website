FROM tomcat:9.0-jdk11-openjdk-slim

# Remove default Tomcat applications
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy WebContent into container ROOT
COPY shopping-cart/WebContent /usr/local/tomcat/webapps/ROOT
COPY shopping-cart/src /tmp/src

# Remove pre-compiled host classes and compile strictly with Java 11 in container
RUN rm -rf /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/* && \
    mkdir -p /usr/local/tomcat/webapps/ROOT/WEB-INF/classes && \
    find /tmp/src -name "*.java" > /tmp/java_files.txt && \
    javac -source 11 -target 11 -cp "/usr/local/tomcat/lib/servlet-api.jar:/usr/local/tomcat/webapps/ROOT/WEB-INF/lib/*" -d /usr/local/tomcat/webapps/ROOT/WEB-INF/classes @/tmp/java_files.txt && \
    rm -rf /tmp/src /tmp/java_files.txt

# Duplicate ROOT app to shopping-cart context
RUN cp -r /usr/local/tomcat/webapps/ROOT /usr/local/tomcat/webapps/shopping-cart

# Bind Tomcat HTTP connector dynamically to Render's $PORT environment variable
CMD ["sh", "-c", "sed -i \"s/8080/${PORT:-8080}/g\" /usr/local/tomcat/conf/server.xml && catalina.sh run"]
