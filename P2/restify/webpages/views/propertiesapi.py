from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView, CreateAPIView, DestroyAPIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
import json
from django.http import HttpResponse

    

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
from webpages.serializers.serializers_property import PropertySerializer, PropertyImageSerializer, PropertyTimeRangePriceHostOfferSerializer
from webpages.serializers.serializer_rangepriceoffer import RangePriceOfferSerializer

#HOST VIEW


# only triggered on host dashboard /allListings
class ListAllPropertiesAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        properties = Property.objects.filter(property_owner=self.request.user)

        return properties
    

class CreatePropertiesAPIView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):

        # set the property_owner field of serializer to the current user
        serializer.validated_data['property_owner'] = self.request.user
        # print(self.request.GET, 'leo maaaaaaaan')

        # call the super perform_create method to save the reservation instance
        super().perform_create(serializer)

class CreateAvailableDateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PropertyTimeRangePriceHostOfferSerializer

    
    def perform_create(self, serializer):

        # set the property_owner field of serializer to the current user
        serializer.validated_data['property'] = get_object_or_404(Property, id=self.kwargs['pk'])

        start_date = serializer.validated_data['start_date']
        end_date = serializer.validated_data['end_date']

        overlap1 = RangePriceHostOffer.objects.filter(start_date__gte=end_date, end_date__lte=end_date)
        overlap2 = RangePriceHostOffer.objects.filter(start_date__gte=start_date, end_date__lte=start_date)
        # overlap3 = RangePriceHostOffer.objects.filter(start_date__gte=end_date, end_date__lte=end_date,
        #                                    start_date__gte=start_date, end_date__lte=start_date) # causing an error 

        # call the super perform_create method to save the reservation instance
        if overlap1: 
            return HttpResponse(status=405)
        if overlap2:
            return HttpResponse(status=405)
        else: 
            return super().perform_create(serializer)
    
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
    
class OrderPropertyView(ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    pagination_class = PageNumberPagination
    page_size = 10
    
    filter_backends = [OrderingFilter]
    ordering_fields = ["number_of_rooms", "number_of_guest"]



        
        # return super().get_queryset()

class SearchPropertyView(ListAPIView):
    queryset = Property.objects.all()
    serializer_class = RangePriceOfferSerializer
    # filter_backends = [SearchFilter]
    # search_fields = ['=address', "number_of_guest"]
    pagination_class = PageNumberPagination
    page_size = 10

    def get_queryset(self):
        # data = self.request.data
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        location = self.request.query_params.get('location')
        number_of_guest = self.request.query_params.get('number_of_guest')

        # searching thru a foreignkey
        queryset = Property.objects.filter(property_for_available_date__start_date__gte=start_date,
                                           property_for_available_date__end_date__lte=end_date,
                                           address__icontains=location,
                                           number_of_guest__gte=number_of_guest)
        
        # props_id = []
        # for property in queryset.distinct():
        #     props_id.append(property.pk)
        # print(props_id, 'these are the props id ')
        
        query_set2 = RangePriceHostOffer.objects.filter(property__in=queryset, start_date__gte=start_date, end_date__lte=end_date)
        # print(query_set2, 'this is the queryset of rangepricehostoffer')
        # query_set3 = query_set2.filter(start_date__gte=start_date, end_date__lte=end_date)
        
        return query_set2.distinct()

class FilterPropertyView(ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    # filter_backends = [SearchFilter]
    # search_fields = ['=address', "number_of_guest"]

    def get_queryset(self):
        # data = self.request.data

        # get all query parameters
        price_per_night = self.request.query_params.get('price_per_night')
        number_of_rooms = self.request.query_params.get('number_of_rooms')
        number_of_bed = self.request.query_params.get('number_of_bed')
        baths = self.request.query_params.get('baths')
        # essentials = self.request.query_params.get('essentials')
        # features = self.request.query_params.get('features')
        # safety_features = self.request.query_params.get('safety_features')
        # location = self.request.query_params.get('location')


        # get access to all the properties that satisfy the search button criteria
        properties = json.loads(self.request.body)

        # get the ids of all the properties 
        props_ids = []
        for i in range(len(properties)):
            props_ids.append(properties[i]['property'])

        # get all the relevant properties through which I need to filter using the query params
        relevant_properties = Property.objects.filter(id__in=props_ids).distinct()

        # do the filtering 
        filtered_relevant_properties = relevant_properties.filter(property_for_available_date__price_per_night__gte=price_per_night, 
                                   number_of_rooms__gte=number_of_rooms,
                                   number_of_bed__gte=number_of_bed,
                                   baths__gte=baths)
        
        return filtered_relevant_properties.distinct()