from django.contrib import admin
from webpages.models.comment import Comment
from webpages.models.notification import Notification
from webpages.models.property import Property 
from webpages.models.reservation import Reservation
from webpages.models.user import RestifyUser

# Register your models here.

admin.site.register(Comment) 
admin.site.register(Notification)
admin.site.register(Property)
admin.site.register(Reservation)
admin.site.register(RestifyUser)

