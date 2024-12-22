from django.urls import path
from . import views

urlpatterns = [
    path('check-auth/', views.check_auth, name='check-auth'),
] 