# Use the PHP 7.4 image
FROM php:latest

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the application files to the container
COPY . .

# Expose port 80 to the outside world
EXPOSE 80

# Start PHP's built-in web server
CMD ["php", "-S", "0.0.0.0:80"]


# docker build -t my-apache-server .

# docker run -d -p 8080:80 my-apache-server


# http://localhost:8080/Calculadora-PACE/calculadora.html

