from django.shortcuts import render
from cartridge.shop.models import Product
from django.http import HttpResponse

from django.core import serializers
import json
# Create your views here.


def productApi(request, slug):
	data, body, header = {}, {}, {}

	try:
		product = Product.objects.get(slug= slug)
	except Exception as e:
		raise e
	body['context'] = serializers.serialize('json', [product])
	body['images'] = serializers.serialize('json', product.images.all())
	#body['context'] = filterData(product)
	header['code'] = 200
	header['message'] = 'success'

	data['header'] = header
	data['body'] = body

	return HttpResponse(json.dumps(data), content_type="application/json")

def filterData(product):
	new_product = {}
	new_product['title']       = product.title
	new_product['price']       = float(product.sale_price)
	new_product['old_price']   = float(product.unit_price)
	new_product['description'] = product.description
	images = []
	for image in product.images.all():
		images.append(str(image))
	new_product['images'] = images
	return new_product