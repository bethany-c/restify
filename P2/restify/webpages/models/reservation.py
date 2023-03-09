from django.db import models
from .user import RestifyUser
# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from .comment import Comment 
from .property import Property


# For Reservations
# using content type also

class Reservation(models.Model):
    
    start_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=True)
    # user = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='restify_user_for_reservation')
    # property_owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='property_owner_of_reservation')
    posted_on = models.DateTimeField(auto_now=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='reservation_content')
    object_id = models.PositiveIntegerField()  # need to set SingleComment id to this object_id
    content_object = ('content_type', 'object_id')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reservation_property')



    PENDING = 'PE'
    TERMINATED = 'TE'
    APPROVED = 'AP'
    DENIED = 'DE'
    EXPIRED = 'EX'
    CANCELLED = 'CA'
    COMPLETED = 'CO'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (TERMINATED, 'Terminated'),
        (APPROVED, 'Approved'),
        (DENIED, 'Denied'),
        (EXPIRED, 'Expired'),
        (CANCELLED, 'Cancelled'),
        (COMPLETED, 'Completed'),

    ]
    status = models.CharField(
        default=PENDING, 
        choices=STATUS_CHOICES,
        max_length=2,
    )
    # comment = models.OneToOneField(Comment, on_delete=models.CASCADE)

# class Pending(models.Model):
#     approve_status = models.BooleanField(default=False)

# class Denied(models.Model):
#     content = models.TextField(null=True, blank=True)

# class Expired(models.Model):
#     content = models.TextField(null=True, blank=True)

# class Approved(models.Model):
#     content = models.TextField(null=True, blank=True)
    
# class Canceled(models.Model):
#     content = models.TextField(null=True, blank=True)

# class Terminated(models.Model):
#     content = models.TextField(null=True, blank=True)
#     comment = models.OneToOneField(Comment, on_delete=models.CASCADE)

# class Completed(models.Model):
#     content = models.TextField(null=True, blank=True)
#     comment = models.OneToOneField(Comment, on_delete=models.CASCADE)