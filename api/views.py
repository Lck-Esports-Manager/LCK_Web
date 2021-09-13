

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
