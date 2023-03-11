from rest_framework.serializers import ModelSerializer, MultipleChoiceField
from ..models.user import RestifyUser
from webpages.models.property import Property, PropertyImage, AskingPrice, AvailableDate
# from .serializers_reservation import ReservationSerializer


class PropertySerializer(ModelSerializer):

    essentials = MultipleChoiceField(choices=Property.CHOICES_ESSENTIALS)
    features = MultipleChoiceField(choices=Property.CHOICES_FEATURES)
    safety_features = MultipleChoiceField(choices=Property.CHOICES_SAFETY)
    location = MultipleChoiceField(choices=Property.CHOICES_LOCATION)
    class Meta:
        model = Property
        fields = ['address', 'number_of_guest', 'number_of_bed', 'number_of_bed', 'number_of_rooms', 'baths', 'description', 'essentials', 'features', 'location', 'safety_features']
        # property_owner does not have to be sent 

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    

    
class PropertyImageSerializer(ModelSerializer):
    
    class Meta:
        model = PropertyImage
        fields = '__all__'
        # property_owner does not have to be sent 

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    
class PropertyAvailableDateSerializer(ModelSerializer):
    
    class Meta:
        model = AvailableDate
        fields = '__all__'
        # property_owner does not have to be sent 

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    
class PropertyAskingPriceSerializer(ModelSerializer):
    
    class Meta:
        model = AskingPrice
        fields = '__all__'
        # property_owner does not have to be sent 

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)

