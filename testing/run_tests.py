import requests

url = 'http://127.0.0.1:8080/index.php'
response = requests.get(url)


print(response.text)