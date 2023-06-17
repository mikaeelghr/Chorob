from django.urls import path

from . import views

urlpatterns = [
    path('do', views.ws, name='product_price_change'),
]
