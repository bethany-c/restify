from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate


    

from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import Response
from rest_framework_simplejwt.authentication import api_settings, JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.reservation import Reservation
from ..models.property import Property
from django.shortcuts import get_object_or_404



from webpages.serializers.serializer_user import UserSerializer
from webpages.serializers.serializers_reservation import ReservationSerializer
from webpages.serializers.serializers_property import PropertySerializer

#HOST VIEW


# only triggered on host dashboard /allListings
class ListAllPropertiesAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        properties = Property.objects.filter(property_owner=self.request.user)
        return properties 
    



