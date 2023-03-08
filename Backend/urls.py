from django.urls import path, include
#from djoser.views import TokenCreateView, TokenDestroyView

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('<str:room_name>/', views.room, name='room'),
    path('<str:room_name>/message/', views.message, name='message'),
    
    url(r'^auth/', include('djoser.urls')),
    #path('api/auth/token/', TokenCreateView.as_view(), name='token-create'),
    #path('api/auth/token/destroy/', TokenDestroyView.as_view(), name='token-destroy'),
]