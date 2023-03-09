from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from django.views.decorators.csrf import csrf_exempt
from stream_chat import StreamChat
from backend import settings

from backend.models import Chat


# Home
def home(request):
    return render(request, 'home.html')

@login_required
def chat(request):
    User = get_user_model()
    user_id = request.user.id
    user = User.objects.get(id=user_id)

    chat_client = StreamChat(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)
    user_token = chat_client.create_token(str(user_id))

    context = {
        'stream_api_key': settings.STREAM_API_KEY,
        'stream_chat_channel_type': settings.STREAM_CHAT_CHANNEL_TYPE,
        'stream_chat_channel_name_prefix': settings.STREAM_CHAT_CHANNEL_NAME_PREFIX,
        'user': {
            'id': user.id,
            'name': user.username,
            #'image_url': user.profile_image.url,
        },
        'user_token': user_token,
        'channel_name': 'my-channel',
    }
    return render(request, 'chat.html', context)

