# Start with a slim Python base image
FROM python:3.8-slim

# Install OpenCV and other necessary libraries
RUN apt-get update && apt-get install -y \
    libsm6 libxext6 libxrender-dev libglib2.0-0 \
    && apt-get clean

# Install Python packages
RUN pip install opencv-python

# Copy the application code to the container
COPY . /app

# Set the working directory
WORKDIR /app

# Define the command to run the application
CMD ["python", "face_detection.py"]
