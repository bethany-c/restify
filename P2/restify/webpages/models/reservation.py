from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from .comment import Comment 


# For Reservations
# using content type also

class Reservation(models.Model):
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    posted_on = models.DateTimeField(auto_now=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()  # need to set SingleComment id to this object_id
    content_object = ('content_type', 'object_id')

class Pending(models.Model):
    approve_status = models.BooleanField(default=False)

class Denied(models.Model):
    content = models.TextField(null=True, blank=True)

class Expired(models.Model):
    content = models.TextField(null=True, blank=True)

class Approved(models.Model):
    content = models.TextField(null=True, blank=True)
    
class Canceled(models.Model):
    content = models.TextField(null=True, blank=True)

class Terminated(models.Model):
    content = models.TextField(null=True, blank=True)
    comment = models.OneToOneField(Comment, on_delete=models.CASCADE)

class Completed(models.Model):
    content = models.TextField(null=True, blank=True)
    comment = models.OneToOneField(Comment, on_delete=models.CASCADE)