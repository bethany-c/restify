from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


from .user import RestifyUser

# For Property
class Property(models.Model):
    property_owner = models.ForeignKey(RestifyUser)
    address = models.TextField()
    number_of_guest = models.PositiveIntegerField()
    number_of_bed = models.PositiveIntegerField()
    number_of_rooms = models.PositiveIntegerField()
    baths = models.PositiveIntegerField()
    description = models.TextField()

    CHOICES_ESSENTIALS = (
        ()

    )
    essentials = models.BooleanField(choices=CHOICES_ESSENTIALS, widget=models.CheckboxSelectMultiple())
    CHOICES_FEATURES = (
        ()

    )
    features = models.BooleanField(choices=CHOICES_FEATURES, widget=models.CheckboxSelectMultiple())

    CHOICES_LOCATION = (
        ()

    )
    location = models.BooleanField(choices=CHOICES_LOCATION, widget=models.CheckboxSelectMultiple())
    CHOICES_SAFETY = (
        ()

    )

    safety_features = models.BooleanField(choices=CHOICES_SAFETY, widget=models.CheckboxSelectMultiple())





class PropertyImage(models.Model):
    name = models.CharField(max_length=255)
    product = models.ForeignKey(Property, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')

class Available_date(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)

class AskingPrice(models.Model):
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)
    price = models.PositiveBigIntegerField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
