import sys
import requests
from PIL import Image
import numpy as np
import subprocess
from io import BytesIO

# URL endpoint
endpoint_url = sys.argv[2]

# Set up authentication
token = ""

command = 'gcloud auth print-access-token'

try:
    output = subprocess.check_output(command, shell=True, universal_newlines=True)
    # remove newline at the end
    output = output[:-1]
    token = output
except subprocess.CalledProcessError as e:
    print(f"Error executing command: {e}")

# Add bearer header to the request
headers = {
    'Authorization': f'Bearer {token}'
}

# Get image URL from command line arguments
image_url = sys.argv[1]

# Download the image from the URL
response = requests.get(image_url)
image = Image.open(BytesIO(response.content))

# Preprocess the image
image = image.resize((112, 112))  # Resize the image to match the input size of the model
image = np.array(image) / 255.0  # Normalize the image
image = np.expand_dims(image, axis=0)  # Add a batch dimension

# Create payload with instances
payload = {'instances': image.tolist()}

# Send POST request to the endpoint with bearer header
response = requests.post(endpoint_url, json=payload, headers=headers)

# Extract prediction results from the response
response = response.json()
predictions = np.array(response['predictions'])

# Interpret the predictions
class_labels = ['Dermatitis', 'Eczema/Eksim', 'Psoriasis']  # Replace with your own class labels
predicted_class = np.argmax(predictions[0])
predicted_label = class_labels[predicted_class]
confidence = predictions[0][predicted_class]

# Print the predicted class and confidence
print(predicted_label, confidence, sep=',')

