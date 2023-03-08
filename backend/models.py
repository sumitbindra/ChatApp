# chat/models.py

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

class Chat(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text
