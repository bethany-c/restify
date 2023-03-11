


from django.contrib import admin
from django.urls import path, include
from .views import accountsapi
from rest_framework_simplejwt.views import TokenObtainPairView
from .views.accountsapi import LoginAPIView, UserProfileEditAPIView, UserProfileAPIView, SignupAPIView, LogoutAPIView
from .views.reservationapi import ListAllReservationsAPIView, CreateReservationAPIView, RequestToTerminateReservationAPIView, TerminateReservationAPIView, ListAllRequestedReservationsAPIView, ListAllCancelledReservationsAPIView, ReasonForCancellingAPIView, ListAllCompletedReservationsAPIView, ReviewForHostAPIView, ListAllTerminatedReservationsAPIView, HostListAllRequestedReservationsAPIView
from .views.reservationapi import ApproveReservationAPIView, HostListAllOfApprovedReservationsAPIView, HostListAllCancelledReservationsAPIView, HostDenyCancellationRequestAPIView, HostApproveCancellationRequestAPIView, HostListAllCompletedReservationsAPIView, ReviewForGuestAPIView, HostListAllTerminatedReservationsAPIView, ReasonForTerminatingAPIView, DenyReservationAPIView
from .views.propertiesapi import *
from .views.commentsapi import GetAllPropertyComments, CreatePropertyCommentAPIView

# format of spacing 
# getter
# take care of all buttons 

app_name = 'webpages'
urlpatterns = [
    # LEOS CODE 
    path('property/<int:pk>/detail/', DetailPropertiesAPIView.as_view(), name='property_detail'), # works
    # path('properties/', ListAllPropertiesAPIView.as_view(), name='properties'),
    path('property/<int:pk>/edit/', EditPropertiesAPIView.as_view(), name='property_edit'), 
    path('property/<int:pk>/delete/', DeletePropertiesAPIView.as_view(), name='property_delete'),

    path('property/<int:pk>/order/', OrderPropertyView.as_view(), name='property_order'),
    path('property/search/', SearchPropertyView.as_view(), name='property_search'),
    path('property/order/', OrderPropertyView.as_view(), name='property_order'),
    path('<int:property_id>/create_timerange_price', CreateAvailableDateAPIView.as_view(), name='create_timerange_price'),

    # MUSTAFAS CODE 
    path('admin/', admin.site.urls),
    path('properties/all/', ListAllPropertiesAPIView.as_view(), name='list_all_properties_host'), # works - for host 
    path('property/add/', CreatePropertiesAPIView.as_view(), name="add_property"),

    path('login/', LoginAPIView.as_view(), name='login'), # didnt test, do with prof
    path('signup/', SignupAPIView.as_view(), name='signup'), # didnt test, do with prof
    path('logout/', LogoutAPIView.as_view(), name='logout'), # didnt test, do with prof
    path('profile/view/', UserProfileAPIView.as_view(), name='view_profile'), # works 
    path('profile/edit/', UserProfileEditAPIView.as_view(), name='edit_profile'), # works 

    path('<int:property_id>/reservations/add/', CreateReservationAPIView.as_view(), name='create_reservation'), # works

    path('reservations/approved/', ListAllReservationsAPIView.as_view(), name='approved_by_host_reservations'), # buggy, returns unique properties - i want repeat properties corresponding to each reservation
    path('<int:reservation_id>/terminate_request/', RequestToTerminateReservationAPIView.as_view(), name='request_to_terminate_reservation'), # works - changing status to CR

    path('reservations/requested/', ListAllRequestedReservationsAPIView.as_view(), name='requested_reservations'), # works but same bug as approved_by_host_reservations
    path('<int:reservation_id>/terminate/', TerminateReservationAPIView.as_view(), name='terminate_reservation'), # can only directly terminate if the reservation has not been approved yet

    path('reservations/cancellations/', ListAllCancelledReservationsAPIView.as_view() ,name='cancellations'),
    path('<int:reservation_id>/reason_for_cancelling/', ReasonForCancellingAPIView.as_view(), name='reason_for_cancelling'),

    path('reservations/completed/', ListAllCompletedReservationsAPIView.as_view(), name='completed_reservations'),
    path('<int:reservation_id>/review_for_host/', ReviewForHostAPIView.as_view(), name='review_for_host'), #for both: review for host button on completed page and terminated page 

    path('reservations/terminated/', ListAllTerminatedReservationsAPIView.as_view(), name='completed_reservations'),

    #host - these are only available if there is a host dashboard on the front end 
    path('listings/all/', ListAllPropertiesAPIView.as_view(), name='all_listings'), # returns the current host's listings

    path('listings/requested/', HostListAllRequestedReservationsAPIView.as_view(), name='requested_reservations'), # not working 
    path('<int:reservation_id>/approve/', ApproveReservationAPIView.as_view(), name='host_approved'), # approve button host request page
    path('<int:reservation_id>/deny/', DenyReservationAPIView.as_view(), name='host_denied'), # deny button host request page


    path('listings/approved/', HostListAllOfApprovedReservationsAPIView.as_view(), name='approved_by_host_listings'), # all of the listings he approved are his own(for which hes a prop owner)
    path('<int:reservation_id>/termination_by_host/', TerminateReservationAPIView.as_view(), name='termination_by_host'), 


    path('listings/cancellations/', HostListAllCancelledReservationsAPIView.as_view() ,name='all_cancellation_requests'), 
    path('<int:reservation_id>/approve_cancellation/', HostApproveCancellationRequestAPIView.as_view(), name='host_approved_cancellation'), # approve button host cancellation page
    path('<int:reservation_id>/deny_cancellation/', HostDenyCancellationRequestAPIView.as_view(), name='host_denied_cancellation'), # deny button host cancellation page



    path('listings/completed/', HostListAllCompletedReservationsAPIView.as_view(), name='completed_listings'), # get all completed listings that this host owns 
    path('<int:reservation_id>/review_for_guest/', ReviewForGuestAPIView.as_view(), name='review_for_guest_by_host'), #for both: review for host button on completed page and terminated page


    path('listings/terminated/', HostListAllTerminatedReservationsAPIView.as_view(), name='all_listings_terminated_by_host'), # get all completed listings that this host owns 
    path('<int:reservation_id>/reason_for_terminating/', ReasonForTerminatingAPIView.as_view(), name='reason_for_cancelling'),



    # BETHANY's PART
    path('reservations/<int:reservation_id>/property-comments/', GetAllPropertyComments.as_view(), name='get_all_property_comments'),
    path('reservations/<int:reservation_id>/property-comments/new/', CreatePropertyCommentAPIView.as_view(), name='create_property_comment'),


]