from rest_framework.serializers import ModelSerializer, CharField
from ..models.user import RestifyUser
from webpages.models.property import Property 


class PropertySerializer(ModelSerializer):
    
    class Meta:
        model = Property
        fields = ['address', 'number_of_guest', 'number_of_bed', 'number_of_bed', 'number_of_rooms', 'baths', 'description', 'essentials', 'features', 'location', 'safety_features']
        # property_owner does not have to be sent 

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
