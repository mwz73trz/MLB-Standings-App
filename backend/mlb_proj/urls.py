from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('mlb_app.urls')),
    path('login/', include('mlb_auth.urls')),
]
