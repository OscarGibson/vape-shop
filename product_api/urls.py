from django.conf.urls import url
from mezzanine.conf import settings

from .views import productApi, addToCart

_slash = "/" if settings.APPEND_SLASH else ""

urlpatterns = [
	url("^add-to-cart%s$" % _slash, addToCart, name= "addToCart"),
	url("^(?P<slug>.+)%s$" % _slash, productApi, name= "productApi"),
]