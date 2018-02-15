"""
WSGI config for vape_shop project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from mezzanine.utils.conf import real_project_name

os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                      "%s.settings" % real_project_name("vape_shop"))

application = get_wsgi_application()


"""
  GNU nano 2.3.1                             File: passenger_wsgi.py                                                                 

import os
import sys

from django.core.wsgi import get_wsgi_application
from mezzanine.utils.conf import real_project_name


sys.path.insert(0, os.path.dirname(__file__))


def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    message = 'It works!\n'
    version = 'Python %s\n' % sys.version.split()[0]
#    debug = 'WSGI: %s' % get_wsgi_application('87687')
    response = '\n'.join([message, version])
    return [response.encode()]


os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                      "%s.settings" % real_project_name("vape_shop"))

"""


