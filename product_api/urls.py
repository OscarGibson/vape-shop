from __future__ import unicode_literals

from django.conf.urls import url
from mezzanine.conf import settings

from .views import product_api, add_to_cart

_slash = "/" if settings.APPEND_SLASH else ""

urlpatterns = [
	url("^add%s$" % _slash, add_to_cart, name= "add_to_art"),
	url("^(?P<slug>.+)%s$" % _slash, product_api, name= "product_api"),
]