# Sử dụng MySQL 8.0.23 làm base image
FROM mysql:8.0.23

# Thiết lập biến môi trường cho MySQL
ENV MYSQL_ROOT_PASSWORD=1234

# Cấu hình để sử dụng plugin xác thực
CMD ["--default-authentication-plugin=mysql_native_password"]
