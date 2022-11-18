import boto3
import json
import os

def lambda_handler(event, context):
    required_pw = os.environ['PASSWORD']
    body = json.loads(event['body'])  # todo: directly send JSON, don't stringify
    key = body['key']
    pw = body['pw']
    if (required_pw != pw):
        return {
            'statusCode': 401,
            'body': 'Wrong password',
            'headers': {
                'Access-Control-Allow-Origin': '*'
            }
        }
    url = boto3.client('s3').generate_presigned_url(
        ClientMethod='put_object',
        Params={'Bucket': 'choschtbar-touren', 'Key': key, 'ACL': 'public-read'},
        ExpiresIn=3600)

    return {
        'statusCode': 200,
        'body': json.dumps(url),
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    }
