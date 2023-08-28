import json
from decimal import Decimal
import boto3

def load_data(states, dynamodb=None):
    dynamodb = boto3.resource(
        'dynamodb'
    )

    states_table = dynamodb.Table('States')
    for state in states:
        print(state)
        state_id = state['state_id']
        state_abbr = state['state']

        print('Displaying book data', state_id, state_abbr)
        states_table.put_item(Item=state)

if __name__ == '__main__':
    with open('../components/covidData.json') as json_file:
        state_list = json.load(json_file, parse_float=Decimal)
    load_data(state_list)