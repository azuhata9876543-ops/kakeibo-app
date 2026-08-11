FROM eclipse-temurin:21-jdk-jammy AS build
COPY backend/ ./
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy
COPY --from=build /target/*.jar app.jar
ENV SPRING_DATASOURCE_URL=$SPRING_DATASOURCE_URL \
    SPRING_DATASOURCE_USERNAME=$SPRING_DATASOURCE_USERNAME \
    SPRING_DATASOURCE_PASSWORD=$SPRING_DATASOURCE_PASSWORD
ENTRYPOINT ["java", "-jar", "/app.jar", "--server.port=8080"]
