import json
import boto3
import os

def lambda_handler(event, context):
    required_pw = os.environ['PASSWORD']
    body = json.loads(event['body']) # todo: directly send JSON, don't stringify
    key = body['key']
    pw = body['pw']
    if (required_pw != pw):
        raise Exception('Password does not match')
    url = boto3.client('s3').generate_presigned_url(
    ClientMethod='put_object', 
    Params={'Bucket': 'choschtbar-touren', 'Key': key, 'ACL': 'public-read'},
    ExpiresIn=3600)  # will this work in summer time?
    
    return {
        'statusCode': 200,
        'body': json.dumps(url),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    }
