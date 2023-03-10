from rest_framework.serializers import ModelSerializer, CharField, PrimaryKeyRelatedField
from ..models.user import RestifyUser
from webpages.models.reservation import Reservation 
from django.db import models
from django.contrib.contenttypes.models import ContentType




class ReservationSerializerAdd(ModelSerializer):
    content_type = PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False)

    class Meta:
        model = Reservation
        # datetime --> "date_joined": "2024-02-10T07:23:53.568Z"
        fields = ['start_date', 'end_date', 'num_of_guests', 'content_type']

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    
class ReservationSerializer(ModelSerializer):
    content_type = PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False)

    class Meta:
        model = Reservation
        # datetime --> "date_joined": "2024-02-10T07:23:53.568Z"
        fields = ['content_type']

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    


    # start_date = models.DateTimeField(auto_now=True)
    # end_date = models.DateTimeField(auto_now=True)
    # user = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='restify_user_for_reservation') # user that booked this 
    # # property_owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='property_owner_of_reservation')
    # posted_on = models.DateTimeField(auto_now=True)
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='reservation_content')
    # object_id = models.PositiveIntegerField()  # need to set SingleComment id to this object_id
    # content_object = ('content_type', 'object_id')
    # property = models.ForeignKey(Property, on_delete=models.CA