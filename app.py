import requests
import os

# Define the API URL and the folder to save images
api_url = "https://api.ucsb.edu/dining/cams/v2/still/de-la-guerra?ucsb-api-key=7oIGngArZiu7cS8hiFxpz17eP4XaUQCp&ts=1736635267207"
save_folder = "images"

# Create the folder if it doesn't exist
if not os.path.exists(save_folder):
    os.makedirs(save_folder)

# Fetch the image data from the API
response = requests.get(api_url)

# Check if the request was successful
if response.status_code == 200:
    # Save the image directly from the response content
    image_name = os.path.join(save_folder, "de_la_guerra_image.jpg")  # You can modify the name as needed
    with open(image_name, 'wb') as f:
        f.write(response.content)
    print(f"Image saved to {image_name}")
else:
    print("Failed to fetch data from the API. Status code:", response.status_code)