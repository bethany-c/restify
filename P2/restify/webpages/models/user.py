from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class RestifyUser(AbstractUser):
    host_or_not = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='images/', height_field=None, width_field=None, max_length=100, null=True, blank=True) # null=True means this attribute can be null in db # blank=True means it can be blank in the form
    phone_number = models.CharField(max_length=20) # see how to take extensions into account 
    first_name = models.CharField()
    last_name = models.CharField()
    email = models.EmailField()
    username = None
    # password fields already being inherited from AbstractUser
