import urllib.request
import json

url = 'https://api.data.gov.in/resource/9ef0be3f-08d4-458b-a2a3-a4ca5b2ed350?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=10&filters%5Bstate%5D=Punjab'
req = urllib.request.Request(url, headers={'User-Agent': 'AgroPrice-AI'})
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read().decode())
    records = data.get('records', [])
    print(f'Records fetched: {len(records)}')
    if records:
        print('Sample record:')
        print(json.dumps(records[0], indent=2))
    else:
        print('No records found.')
except Exception as e:
    print(f'Error: {e}')
