from django.urls import path

from main.views import main


appname = 'main'

urlpatterns = [
    path('', main),
]