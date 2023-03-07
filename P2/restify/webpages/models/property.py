from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# For Property
class Property(models.Model):
    address = models.TextField()
    number_of_guest = models.PositiveIntegerField()
    number_of_bed =models.PositiveIntegerField()
    baths = models.PositiveIntegerField()
    description = models.TextField()
    amenities_available = models.TextField()

class PropertyImage(models.Model):
    name = models.CharField(max_length=255)
    product = models.ForeignKey(Property, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')

class Available_date(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)