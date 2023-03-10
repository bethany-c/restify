from django.urls import path
from . import views

app_name="restweb"
urlpatterns = [ 
    path('property/<int:pk>/detail/', views.DetailPropertiesAPIView.as_view(), name='property_detail'),
    path('properties/', views.ListAllPropertiesAPIView.as_view(), name='properties'),
    path('property/<int:pk>/edit/', views.EditPropertiesAPIView.as_view(), name='property_edit'),
    path('property/<int:pk>/delete/', views.DetletePropertiesAPIView.as_view(), name='property_delete'),
    
   
]
