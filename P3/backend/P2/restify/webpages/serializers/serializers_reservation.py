from rest_framework.serializers import ModelSerializer, CharField, PrimaryKeyRelatedField
from ..models.user import RestifyUser
from webpages.models.reservation import Reservation 
from django.db import models
from django.contrib.contenttypes.models import ContentType
from webpages.serializers.serializer_rangepriceoffer import RangePriceOfferSerializer




class ReservationSerializerAdd(ModelSerializer):
    content_type = PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False)

    class Meta:
        model = Reservation
        # datetime --> "date_joined": "2024-02-10T07:23:53.568Z"
        fields = ['content_type']

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    
# class ReservationSerializer2(ModelSerializer):
#     content_type = PrimaryKeyRelatedField(queryset=ContentType.objects.all(), required=False)

#     class Meta:
#         model = Reservation
#         # datetime --> "date_joined": "2024-02-10T07:23:53.568Z"
#         fields = ['content_type']

#     def create(self, validated_data):
#         # print(self.context['request'].user)
#         return super().create(validated_data)


from .serializers_property import PropertySerializer
class ReservationSerializer(ModelSerializer): # onyl used for reading and not for any other reason
    property = PropertySerializer(read_only=True) # cannot be changed 



    class Meta:
        model = Reservation
        exclude = ('user',)
        # fields = '__all__'


