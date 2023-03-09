from django.db import models
from multiselectfield import MultiSelectField

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


from .user import RestifyUser

# For Property
class Property(models.Model):
    property_owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='property_owner')
    address = models.TextField() # just the city 
    number_of_guest = models.PositiveIntegerField()
    number_of_bed = models.PositiveIntegerField()
    number_of_rooms = models.PositiveIntegerField()
    baths = models.PositiveIntegerField()
    description = models.TextField()
    amenities = models.CharField(max_length=500)
    
    # AMENTIIES 

    # CHOICES_ESSENTIALS = (
    #     ('wifi', 'Wifi'),
    #     ('tv', 'TV'),
    #     ('kitchen', 'Kitchen'),
    #     ('workspace', 'Workspace'),
    #     ('air_conditioning', 'Air Conditioning'),
    #     ('heating', 'Heating'),
    #     ('washer', 'Washer'),
    #     ('dryer', 'Dryer'),

    # )
    # essentials = models.BooleanField(choices=CHOICES_ESSENTIALS, widget=models.CheckboxSelectMultiple())
    # CHOICES_FEATURES = (
    #     ('pool', 'Pool'),
    #     ('hot_tub', 'Hot Tub'),
    #     ('patio', 'Patio'),
    #     ('grill', 'Grill'),
    #     ('gym', 'Gym'),
    #     ('piano', 'Piano'),
    #     ('fire_pit', 'Fire Pit'),
    #     ('outdoor_shower', 'Outdoor Shower'),


    # )
    # features = models.BooleanField(choices=CHOICES_FEATURES, widget=models.CheckboxSelectMultiple())
    # CHOICES_LOCATION = (
    #     ('lake_access','Lake Access'),
    #     ('beach_access', 'Beach Access'),
    #     ('skiin_skiout', 'Ski-in/Ski-out'),

    # )
    # location = models.BooleanField(choices=CHOICES_LOCATION, widget=models.CheckboxSelectMultiple())
    # CHOICES_SAFETY = (
    #     ('smoke_detector', 'Smoke Detector'),
    #     ('first_aid_kit', 'First Aid Kit'),
    #     ('fire_extinguisher', 'Fire Extinguisher'),

    # )

    # safety_features = models.BooleanField(choices=CHOICES_SAFETY, widget=models.CheckboxSelectMultiple())





class PropertyImage(models.Model):
    name = models.CharField(max_length=255)
    product = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='product_attribute_for_propimage')
    image = models.ImageField(upload_to='images/')

class Available_date(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_for_available_date')
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)

class AskingPrice(models.Model):
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)
    price = models.PositiveBigIntegerField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_for_asking_price')
