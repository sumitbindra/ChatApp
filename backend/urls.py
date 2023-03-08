from django.contrib import admin
from django.urls import path, include
#from djoser.views import TokenCreateView, TokenDestroyView

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('chat/', views.chat, name='chat'),
    path('post_chat/', views.post_chat, name='post_chat'),
    
    path("admin/", admin.site.urls),
    path('accounts/', include('allauth.urls')),
    #url(r'^auth/', include('djoser.urls')),
    #path('api/auth/token/', TokenCreateView.as_view(), name='token-create'),
    #path('api/auth/token/destroy/', TokenDestroyView.as_view(), name='token-destroy'),
]