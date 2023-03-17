from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from stream_chat import StreamChat
from django.conf import settings
from django.urls import reverse

from django.shortcuts import render
import os

client = StreamChat(api_key=getattr(settings, 'STREAM_API_KEY', ''), api_secret=getattr(settings, 'STREAM_API_SECRET', ''))

class UserTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.user.id
        user_token = client.create_token(str(user_id))
        return Response({'user_token': user_token}, status=200)


class ChannelMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, channel_id):
        channel = client.channel('messaging', channel_id=channel_id)
        messages = channel.get_messages(limit=10)['messages']
        return Response(messages)

    def post(self, request, channel_id):
        user_id = request.user.id
        text = request.data.get('text')
        channel = client.channel('messaging', channel_id=channel_id)
        message = channel.send_message({'text': text, 'user_id': str(user_id)})
        return Response(message)
    
class MyView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        user_id = request.user.id
        channel_id = 'my-channel'
        token_url = reverse('user-token')
        # messages_url = reverse('channel-messages', args=[channel_id])

        stream_token = client.create_token(str(user_id))

        context = {
            'user_id': user_id,
            'channel_id': channel_id,
            'user_token_url': request.build_absolute_uri(token_url),
            'stream_token': stream_token
            # 'channel_messages_url': request.build_absolute_uri(messages_url)
        }
        return Response(context)

# serve back end and front end together    
def index(request):
    template_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'build', 'index.html')
    return render(request, template_path)