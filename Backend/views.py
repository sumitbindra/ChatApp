from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import login_required

from .models import Room, Message

@login_required
def room(request, room_name):
    room, created = Room.objects.get_or_create(name=room_name)

    messages = reversed(room.message_set.order_by('-timestamp')[:50])

    return render(request, 'room.html', {'room_name': room_name, 'messages': messages})

@login_required
def message(request, room_name):
    room = Room.objects.get(name=room_name)
    message = Message(user=request.user, room=room, content=request.POST['content'])
    message.save()

    return JsonResponse({'status': 'ok'})