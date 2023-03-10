
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView

from webpages.models.reservation import Reservation 
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http.response import HttpResponse, HttpResponseRedirect
from rest_framework.pagination import PageNumberPagination

from ..models import Reservation, PropertyComment, GuestComment
from ..serializers.serializers_comment import PropertyCommentSerializer, CreatePropertyCommentSerializer



class CreatePropertyCommentAPIView(CreateAPIView):
  serializer_class = CreatePropertyCommentSerializer
  permission_classes = [IsAuthenticated]
  
  def perform_create(self, serializer):
    reservation_id = self.kwargs['reservation_id'] # get reservation_id from url
    reservation = get_object_or_404(Reservation, id=reservation_id) # get reservation
    
    # check that the reservation has either been completed or terminated
    if reservation.status != 'CO' or reservation.status != 'TE':
      return HttpResponse('HTTP 401 UNAUTHORIZED', status=401)
    
    reservation_host = reservation.property_owner # get author: if they are the host or user
    reservation_user = reservation.user
    
    if self.request.user != reservation_host or self.request.user != reservation_user:
      return HttpResponse('HTTP 403 FORBIDDEN', status=403)
    if reservation.property_comments.count() >= 3:
      raise ValidationError("Cannot add more than 3 property comments for this reservation.")
    
    # check if the user is adding the first comment
    if self.request.user == reservation_user and reservation.property_comments.count() == 0:
        serializer.validated_data['reservation'] = reservation
        serializer.validated_data['author'] = self.request.user
        return super().perform_create(serializer)
    
    # check if the host is adding a follow up reply
    if self.request.user == reservation_host and reservation.property_comments.count() == 1:
      comment = reservation.property_comments.first()
      if comment.author == reservation_user:
        serializer.validated_data['reservation'] = reservation
        serializer.validated_data['author'] = self.request.user
        return super().perform_create(serializer)
      
    # check if user is adding follow up to host reply
    if self.request.user == reservation_user and reservation.property_comments.count() == 2:
      reply = reservation.property_comments.second()
      if comment.author == reservation_host:
        serializer.validated_data['reservation'] = reservation
        serializer.validated_data['author'] = self.request.user
        return super().perform_create(serializer)
      
    raise ValidationError('Cannot add more than 3 comments', status=401)


# class GetAllComments(ListAPIView):
#   serializer_class = PropertyCommentSerializer
#   # don't need to authenticate??
  
#   def get_queryset(self):
#     PropertyComment.objects.all()
#     return super().get_queryset()
  
class GetAllPropertyComments(ListAPIView):
  serializer_class = PropertyCommentSerializer
  pagination_class = PageNumberPagination
  page_size = 5 # default, can change dynamically later
  # pagination_class.page_size_query_param = 'page_size'
  
  def get_queryset(self):
    reservation_id = self.kwargs['reservation_id']
    return PropertyComment.objects.filter(reservation_id=reservation_id)
  
  def get(self, request, *args, **kwargs):
    self.pagination_class.page_size_query_param = 'page_size'
    return self.list(request, *args, **kwargs)