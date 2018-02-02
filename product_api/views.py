from django.shortcuts import render
from cartridge.shop.models import Product
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect

from cartridge.shop.forms import (AddProductForm, CartItemFormSet,
                                  DiscountForm, OrderForm)

from django.core import serializers
import json
from cartridge.shop.models import Product, ProductVariation
from cartridge.shop.utils import recalculate_cart
# Create your views here.
from cartridge.shop.models import ProductOption
from vape_shop.settings import SHOP_OPTION_TYPE_CHOICES

from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def product_api(request, slug):
	data, body, header = {}, {}, {}

	try:
		product = Product.objects.get(slug= slug)
	except Exception as e:
		raise e
	fields = [f.name for f in ProductVariation.option_fields()]
	body['variations'] = [p.options()[0] for p in product.variations.all()];
	body['variations_name'] = SHOP_OPTION_TYPE_CHOICES[0][1]
	print(SHOP_OPTION_TYPE_CHOICES)
	# body['variations'] = json.dumps([dict([(f, getattr(v, f))
 #        for f in fields + ["sku", "image_id"]]) for v in product.variations.all()])
	body['context'] = serializers.serialize('json', [product])
	body['images'] = serializers.serialize('json', product.images.all())
	#body['context'] = filterData(product)
	header['code'] = 200
	header['message'] = 'success'

	data['header'] = header
	data['body'] = body

	# for p in ProductOption.objects.all():
	# 	print(p.name, SHOP_OPTION_TYPE_CHOICES[p.type-1][1])
	print(body['variations'])

	return HttpResponse(json.dumps(data), content_type="application/json")

def filterData(product):
	new_product = {}
	new_product['title']	   = product.title
	new_product['price']	   = float(product.sale_price)
	new_product['old_price']   = float(product.unit_price)
	new_product['description'] = product.description
	images = []
	for image in product.images.all():
		images.append(str(image))
	new_product['images'] = images
	return new_product



@require_http_methods(["POST", "GET"])
def add_to_cart(request):

	if not request.method == 'POST':
		print('AAAA')
		return HttpResponse({}, status= 400)

	print(request.POST)

	slug = request.POST.get('product-slug')

	published_products = Product.objects.published(for_user= request.user)
	product = get_object_or_404(published_products, slug= slug)
	fields = [f.name for f in ProductVariation.option_fields()]
	variations = product.variations.all()
	variations_json = json.dumps([dict([(f, getattr(v, f))
		for f in fields + ["sku", "image_id"]]) for v in variations])
	to_cart = (request.method == "POST" and
			   request.POST.get("add_wishlist") is None)
	initial_data = {}
	if variations:
		initial_data = dict([(f, getattr(variations[0], f)) for f in fields])
	initial_data["quantity"] = 1
	add_product_form = AddProductForm(request.POST or None, product=product,
								  initial=initial_data, to_cart=to_cart)
	if request.method == "POST":
		print(add_product_form)
		if add_product_form.is_valid():
			if to_cart:
				print('PRODUCT_FORM',add_product_form)
				quantity = add_product_form.cleaned_data["quantity"]
				request.cart.add_item(add_product_form.variation, quantity)
				recalculate_cart(request)
				#info(request, _("Item added to cart"))
				#return redirect("shop_cart")
			else:
				skus = request.wishlist
				sku = add_product_form.variation.sku
				if sku not in skus:
					skus.append(sku)
				#info(requesadd_to_cartt, _("Item added to wishlist"))
				response = redirect("shop_wishlist")
				set_cookie(response, "wishlist", ",".join(skus))
				#return response
	data = {
		'total_price' : format(request.cart.total_price(), '.2f'), 
		'total_quantity' : request.cart.total_quantity(),
		'wishlist' : len(request.wishlist)
	}
	print(data)
	return HttpResponse(json.dumps(data), content_type="application/json")

