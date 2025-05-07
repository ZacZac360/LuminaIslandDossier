import requests

API_KEY = 'yC64acO6xj53iW03VTdPX6QZxY5Y7najMElljT50'
HEADERS = {'x-api-key': API_KEY}

def get_user_num(nickname):
    url = f'https://open-api.bser.io/v1/user/nickname?query={nickname}'
    response = requests.get(url, headers=HEADERS)

    if response.status_code != 200:
        print(f"Failed to fetch userNum: {response.status_code} - {response.text}")
        return None

    data = response.json()

    if 'user' in data and 'userNum' in data['user']:
        return data['user']['userNum']
    else:
        print("User not found or response format unexpected.")
        return None

# Example usage
nickname = "Zai360"
user_num = get_user_num(nickname)
print(f"userNum for {nickname} is {user_num}")
