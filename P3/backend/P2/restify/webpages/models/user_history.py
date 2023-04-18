

from django.db import models
from webpages.models.user import RestifyUser
from webpages.models.reservation import Reservation






class UserHistory(models.Model):
    comment_for_this_user = models.ForeignKey(RestifyUser, on_delete=models.CASCADE)
    comment_for_this_reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)

    content = models.CharField(max_length=255)

    def __str__(self) -> str:
        return "User History for User ID: " + str(self.comment_for_this_user.id) + " with History ID: " + str(self.pk)
    class Meta:
        verbose_name_plural = 'User History Comments'