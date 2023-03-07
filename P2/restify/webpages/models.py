from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# if we split our app to many apps, remember update in setting.py
class RestifyUser(AbstractUser):
    owner_status = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='images', height_field=None, width_field=None, max_length=100)
    phone_number = models.CharField(max_length=20)


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

# For Comment: there are two types: for property: which has 3 phases. the other type is just 1 single comment
# # Create a Comment Example
# sc = SingleComment.objects.create(user=request.user, content='This is a comment')
# c = Comment.objects.create(content_type=ContentType.objects.get_for_model(SingleComment),
#                            object_id=sc.id)
# then we can access c.content_object.user even though user is not in Comment
class Comment(models.Model):
    
    posted_on = models.DateTimeField(auto_now=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()  # need to set SingleComment id to this object_id
    content_object = ('content_type', 'object_id')


class PropertyComment(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    content = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)


class SingleComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()


class TargetComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()



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


# For notification

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()  # need to set SingleComment id to this object_id
    content_object = ('content_type', 'object_id')

# be notified when someone rates my property
class RateNotification(models.Model):
    content = models.OneToOneField(Comment, on_delete=models.CASCADE)

# be notified when someone replies my comment
class CommentNotification(models.Model):
    content = models.OneToOneField(Comment, on_delete=models.CASCADE)

# be notified when my reservation status change as user 
class RenterRequestNotification(models.Model):
    content = models.OneToOneField(Comment, on_delete=models.CASCADE)

# be notified when my property get requested for reservation as owner
class OwnerRequestNotification(models.Model):
    content = models.OneToOneField(Comment, on_delete=models.CASCADE)

# remind me when the date of my approved reservations are about to come up
class ReminderNotification(models.Model):
    content = models.OneToOneField(Comment, on_delete=models.CASCADE)