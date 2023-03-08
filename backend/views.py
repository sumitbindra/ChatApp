from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from django.views.decorators.csrf import csrf_exempt
from stream_chat import StreamChat

from backend.models import Chat


# Home
def home(request):
    return render(request, 'home.html')

@login_required
def chat(request):
    User = get_user_model()
    chats = Chat.objects.all()
    return render(request, 'chat.html', {'chats': chats})

@csrf_exempt
@login_required
def post_chat(request):
    User = get_user_model()
    chat_text = request.POST.get('chat_text')
    user = request.user
    chat = Chat.objects.create(user=user, text=chat_text)
    chat_data = {'id': chat.id, 'text': chat.text, 'user': user.username, 'created_date': chat.created_date}
    client = StreamChat(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)
    client.update_user({'id':user.id, 'name': user.username})
    channel_id = 'chat-global'
    channel = client.channel('messaging', channel_id=channel_id)
    channel.create()
    channel.add_members([user.id])
    message = {'text': chat.text, 'user_id': user.id}
    channel.send_message(message)
    return JsonResponse(chat_data)

