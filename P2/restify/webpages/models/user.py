from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class RestifyUser(AbstractUser):
    owner_status = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='images', height_field=None, width_field=None, max_length=100)
    phone_number = models.CharField(max_length=20)
