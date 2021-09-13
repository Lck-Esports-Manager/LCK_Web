from django.db import models


class Product(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name
