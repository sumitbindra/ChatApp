from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from django.conf.urls.static import static
from django.conf import settings

from .views import UserTokenView, ChannelMessagesView, MyView, index

from . import views

urlpatterns = [
    
    path("admin/", admin.site.urls),
    #path('api/login/', obtain_auth_token),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('chat/token/', UserTokenView.as_view(), name='user-token'),
    path('chat/channels/<str:channel_id>/messages/', ChannelMessagesView.as_view(), name='channel-messages'),
    path('chat/my-view/', MyView.as_view(), name='my-view'),

    # serve back end and front end together
    path("", index, name="index")
]

#urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)