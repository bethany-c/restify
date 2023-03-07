from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from .property import Property 



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

