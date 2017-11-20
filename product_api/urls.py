from django.conf.urls import url

from .views import productApi

urlpatterns = [
	url("^(?P<slug>.+)/$", productApi, name= "productApi"),
]