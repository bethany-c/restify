from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.generics import RetrieveAPIView, ListAPIView, UpdateAPIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from webpages.models.comment import PropertyComment
from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from django.db.models import Q
from functools import reduce
from django.db.models import Count


    

from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import Response
from rest_framework_simplejwt.authentication import api_settings, JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from ..models.reservation import Reservation
from ..models.property import Property
from django.shortcuts import get_object_or_404



from webpages.serializers.serializer_user import UserSerializer
from webpages.serializers.serializers_reservation import ReservationSerializer, ReservationSerializerAdd
from webpages.serializers.serializers_property import PropertySerializer

# add a reservation - note: there has to be a property to tie it to 
class CreateReservationAPIView(CreateAPIView):
    # takes only post request
    serializer_class = ReservationSerializerAdd
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        # get property_id from url
        property_id = self.kwargs['property_id']
        # get property instance with property_id
        property = get_object_or_404(Property, id=property_id)
        # set the property field of serializer to the retrieved property instance
        serializer.validated_data['property'] = property

        # set the user field of serializer to the current user
        serializer.validated_data['user'] = self.request.user
        # serializer.validated_data['object_id'] = serializer.validated_data['pk']

        # serializer.validated_data['num_reservations'] += 1

        # call the super perform_create method to save the reservation instance
        super().perform_create(serializer)

    



# list all of the current users existing approved reservations - approved tab done
class ListAllReservationsAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]

    # we are returning a collection of Property objects therefore we need a property serializer
    serializer_class = ReservationSerializer

    def get_queryset(self):

        # takes out all the reservations that are approved 
        reservations = Reservation.objects.filter(user=self.request.user, status='AP')

        return reservations

        # prop_ids = []
        # for reservation in reservations:
        #     prop_ids.append(reservation.property.pk)
        
        # print(prop_ids, 'these are all the PROPERTY ids bruh yo what ')

        # # create a list of Q objects to filter the properties by their IDs
        # # q_list = [Q(id=id) for id in prop_ids]
        
        # # use the reduce function to combine the Q objects with OR logic
        # # q = reduce(lambda a, b: a | b, q_list)

        # # print(Property.objects.filter(q), 'bro hold up ')

        # # returns all the properties that have an approved reservation on them 
        # return Property.objects.filter(id__in=prop_ids)
        # # prop_hey = Property.objects.filter(id=1)
        # # print(prop_hey.annotate(num_reservations=Count('reservation_property')), 'yo what')
        # # print(properties.annotate(num_reservations=Count('reservation_property')), 'yo what')
        # # return properties.annotate(num_reservations=Count('reservation_property'))


# user: requested, host: cancellations 
class RequestToTerminateReservationAPIView(UpdateAPIView): # user:request to cancel ~ host: terminate tab done 
    
    serializer_class = ReservationSerializerAdd
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        reservation.status = "CR"
        serializer.save()







class ListAllRequestedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    # need to get all properties with status=
    def get_queryset(self):

        # takes out all the reservations that are requested for approval 
        reservations = Reservation.objects.filter(user=self.request.user, status='AR')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids)






# only have access to this view from the user's request tab 
# user: terminated tab, host: terminated tab 
class TerminateReservationAPIView(UpdateAPIView): # terminated tab done 
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        reservation.status = "TE"
        serializer.save()





# all user cancellations 

class ListAllCancelledReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    

    # need to get all properties with status=
    def get_queryset(self):

        # takes out all the reservations that are cancelled
        reservations = Reservation.objects.filter(user=self.request.user, status='CA')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids)
    
# user: terminated tab, host: terminated tab 
class ReasonForCancellingAPIView(UpdateAPIView): # terminated tab done 
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    pk_url_kwarg = 'reservation_id'

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        # hard coding the reason for cancelling at the moment, will use react to import modal message here
        reservation.reason_for_cancelling = 'I really did not want to but something came up'
        serializer.save()

    def update(self, request, *args, **kwargs):
        # update your shit 
        response = super().update(request, *args, **kwargs)
        # need a url here that will trigger a notification to the property_owner that the user who cancelled has left a reason for cancelling
        reservation = Reservation.objects.get(pk=self.kwargs['reservation_id'])

        # REPLACE THE 'url to trigger view' WITH THE VIEW TO TRIGGER NOTIF URL
        response['url_to_redirect_to'] = ['url to trigger view', reservation.reason_for_cancelling]
        return response
    
















# added a cronjob to make the status of each reservation to "CO" as soon as the time passes

# get all reservations that are completed 
class ListAllCompletedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    # need to get all properties with status="CO"
    def get_queryset(self):

        # takes out all the reservations that are cancelled
        reservations = Reservation.objects.filter(user=self.request.user, status='CO')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids)
    

    
class ReviewForHostAPIView(UpdateAPIView):  
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    pk_url_kwarg = 'reservation_id'

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        # hard coding the reason for cancelling at the moment, will use react to import modal message here
        comment = PropertyComment()
        comment.content = "This host was wonderful! 10/10 would come again!"
        reservation.content_type = ContentType.objects.get_for_model(comment)
        serializer.save()

    def update(self, request, *args, **kwargs):
        # update your shit 
        response = super().update(request, *args, **kwargs)
        # need a url here that will trigger a notification to the property_owner that the user who cancelled has left a reason for cancelling
        reservation = Reservation.objects.get(pk=self.kwargs['reservation_id'])

        # REPLACE THE 'url to trigger view' WITH THE VIEW TO TRIGGER NOTIF URL
        response['url_to_redirect_to'] = ['url to trigger view', reservation.content_type]
        return response
    


# list all terminated reservations --> host: terminated, user: terminated 
class ListAllTerminatedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    # need to get all properties with status="CO"
    def get_queryset(self):

        # takes out all the reservations that are cancelled
        reservations = Reservation.objects.filter(user=self.request.user, status='TE')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids)
    
# HOST VIEWS
# -------------------------------------------------------------------------------------------------------------------




# REQUEST TAB
class HostListAllRequestedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get all reservations that have status="AR"
        reservations = Reservation.objects.filter(status="AR")
        prop_ids = []
        # get all the property_ids that correspond to these reservations
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)

        # then get properties which have these ids AND for which the loggedin user is the property_owner
        properties_i_own = Property.objects.filter(id__in=prop_ids, property_owner=self.request.user)


        return properties_i_own
    


class ApproveReservationAPIView(UpdateAPIView): # attach to green approve button
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        reservation.status = "AP" # change to this from 'AR'
        serializer.save()

class DenyReservationAPIView(UpdateAPIView): # attach to red deny button
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        reservation.status = "DE" # change to this from 'AR' to denied(DE)
        serializer.save()



# APPROVED TAB (terminate functionality and all approved)

class HostListAllOfApprovedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get all reservations that have status="AR"
        reservations = Reservation.objects.filter(status="AP")
        prop_ids = []
        # get all the property_ids that correspond to these reservations
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)

        # then get properties which have these ids AND for which the loggedin user is the property_owner
        properties_i_own = Property.objects.filter(id__in=prop_ids, property_owner=self.request.user)


        return properties_i_own

# already implemented above 
# class TerminateReservationAPIView(UpdateAPIView): 
    
#     serializer_class = ReservationSerializer
#     permission_classes = [IsAuthenticated]

#     def get_object(self):
#         reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
#         return reservation
    
#     def perform_update(self, serializer):
#         reservation = serializer.save()
#         reservation.status = "TE"
#         serializer.save()
    






# CANCELLATION TAB


class HostListAllCancelledReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    

    # need to get all properties with status=
    def get_queryset(self):

        # takes out all the reservations that are cancelled
        reservations = Reservation.objects.filter(status='CR')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids, property_owner=self.request.user)
    
class HostApproveCancellationRequestAPIView(UpdateAPIView): # attach to green approve button on cancellation host page
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        reservation.status = "CA" # change to this from 'CR'
        serializer.save()

class HostDenyCancellationRequestAPIView(UpdateAPIView): # attach to red deny button on cancellation host page
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        reservation.status = "AP" # change to this from 'CR'
        serializer.save()



# HOST COMPLETED PAGE 

class HostListAllCompletedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    # need to get all properties with status="CO"
    def get_queryset(self):

        # takes out all the reservations that are cancelled
        reservations = Reservation.objects.filter(status='CO')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids, property_owner=self.request.user)

class ReviewForGuestAPIView(UpdateAPIView):  
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    pk_url_kwarg = 'reservation_id'

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        # hard coding the reason for cancelling at the moment, will use react to import modal message here
        comment = PropertyComment()
        comment.content = "This user was wonderful! 10/10 would come again!"
        reservation.content_type = ContentType.objects.get_for_model(comment)
        serializer.save()

    def update(self, request, *args, **kwargs):
        # update your shit 
        response = super().update(request, *args, **kwargs)
        # need a url here that will trigger a notification to the property_owner that the user who cancelled has left a reason for cancelling
        reservation = Reservation.objects.get(pk=self.kwargs['reservation_id'])

        # REPLACE THE 'url to trigger view' WITH THE VIEW TO TRIGGER NOTIF URL
        response['url_to_redirect_to'] = ['url to trigger view', reservation.content_type]
        return response

    

# HOST TERMINATIONS 

class HostListAllTerminatedReservationsAPIView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    # need to get all properties with status="CO"
    def get_queryset(self):

        # takes out all the reservations that are cancelled
        reservations = Reservation.objects.filter(status='TE')
        prop_ids = []
        for reservation in reservations:
            prop_ids.append(reservation.property.pk)
        
        # returns all the properties that have an approved reservation on them 
        return Property.objects.filter(id__in=prop_ids, property_owner=self.request.user)
    

class ReasonForTerminatingAPIView(UpdateAPIView):  
    
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    pk_url_kwarg = 'reservation_id'

    def get_object(self):
        reservation = get_object_or_404(Reservation, pk=self.kwargs['reservation_id'])
        return reservation
    
    def perform_update(self, serializer):
        reservation = serializer.save()
        # hard coding the reason for cancelling at the moment, will use react to import modal message here
        comment = PropertyComment()
        comment.content = "This user seemed very sus to me"
        reservation.content_type = ContentType.objects.get_for_model(comment)
        serializer.save()

    def update(self, request, *args, **kwargs):
        # update your shit 
        response = super().update(request, *args, **kwargs)
        # need a url here that will trigger a notification to the property_owner that the user who cancelled has left a reason for cancelling
        reservation = Reservation.objects.get(pk=self.kwargs['reservation_id'])

        # REPLACE THE 'url to trigger view' WITH THE VIEW TO TRIGGER NOTIF URL
        response['url_to_redirect_to'] = ['url to trigger view', reservation.content_type]
        return response
    
    

    

    













    





    

          














