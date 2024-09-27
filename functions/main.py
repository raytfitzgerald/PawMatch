# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app, messaging
from google.oauth2 import service_account
from google.auth.transport.requests import Request

initialize_app()

def get_access_token():
    credentials = service_account.Credentials.from_service_account_file(
        'path/to/your/service-account-file.json',
        scopes=['https://www.googleapis.com/auth/firebase.messaging']
    )
    credentials.refresh(Request())
    return credentials.token

@https_fn.on_request()
def send_fcm_message(req: https_fn.Request) -> https_fn.Response:
    # Get the FCM token from the request (you should implement proper validation)
    fcm_token = req.args.get('token')
    if not fcm_token:
        return https_fn.Response("FCM token is required", status=400)

    # Create the message with the new payload structure
    message = messaging.Message(
        notification=messaging.Notification(
            title='New Notification',
            body='This is a test notification sent from Cloud Functions'
        ),
        token=fcm_token,
        android=messaging.AndroidConfig(
            notification=messaging.AndroidNotification(
                click_action="TOP_STORY_ACTIVITY"
            )
        ),
        apns=messaging.APNSConfig(
            payload=messaging.APNSPayload(
                aps=messaging.Aps(category="NEW_MESSAGE_CATEGORY")
            )
        )
    )

    try:
        # Send the message
        response = messaging.send(message)
        return https_fn.Response(f"Successfully sent message: {response}")
    except Exception as e:
        return https_fn.Response(f"Error sending message: {str(e)}", status=500)

# The new HTTP v1 API endpoint is automatically used by the Firebase Admin SDK