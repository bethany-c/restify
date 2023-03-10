
from rest_framework.serializers import ModelSerializer, CharField, PrimaryKeyRelatedField
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404


from ..models.user import RestifyUser
from webpages.models.reservation import Reservation 
from ..models.comment import PropertyComment











class CreatePropertyCommentSerializer(ModelSerializer):
  content_type = PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False)
  
  class Meta:
    model = PropertyComment
    fields = ['text_content', 'author', 'content_type']

  def perform_create(self, serializer):
    reservation_id = self.kwargs['reservation_id'] # get reservation_id from url
    reservation = get_object_or_404(Reservation, id=reservation_id)
    return super().perform_create(serializer)
  
    
class PropertyCommentSerializer(ModelSerializer):
  content_type = PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False)
    
  class Meta:
    model = PropertyComment
    fields = ['content_type', 'reservation', 'author', 'text_content']
    
  def create(self, validated_data):
    return super().create(validated_data)