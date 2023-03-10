from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate


    

from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import Response
from rest_framework_simplejwt.authentication import api_settings, JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.reservation import Reservation
from ..models.property import *
from django.shortcuts import get_object_or_404



from webpages.serializers.serializer_user import UserSerializer
from webpages.serializers.serializers_reservation import ReservationSerializer
from webpages.serializers.serializers_property import PropertySerializer, PropertyAskingPriceSerializer, PropertyAvailableDateSerializer, PropertyImageSerializer

#HOST VIEW


# only triggered on host dashboard /allListings
class ListAllPropertiesAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        properties = Property.objects.filter(property_owner=self.request.user)

        return properties
    

class CreatePropertiesAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer
    
    def perform_create(self, serializer):

        # set the property_owner field of serializer to the current user
        serializer.validated_data['property_owner'] = self.request.user

        # call the super perform_create method to save the reservation instance
        super().perform_create(serializer)
    
# class ImagePropertiesAPIView(CreateAPIView):
#     serializer_class = PropertyImageSerializer

# class AvailableDatePropertiesAPIView(CreateAPIView):
#     serializer_class = PropertyAvailableDateSerializer

# class PricePropertiesAPIView(CreateAPIView):
#     serializer_class = PropertyAskingPriceSerializer
    
class DeletePropertiesAPIView(DestroyAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])

    
class EditPropertiesAPIView(RetrieveAPIView, UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])
    
class DetailPropertiesAPIView(RetrieveAPIView, UpdateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    # image = get_object_or_404(Property, id=self.kwargs['pk']).PropertyImage_set.all()
    # available = get_object_or_404(Property, id=self.kwargs['pk']).AvailableDate_set.all()
    # price = get_object_or_404(Property, id=self.kwargs['pk']).AskingPrice_set.all()
    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])