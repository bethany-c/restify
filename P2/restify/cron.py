from datetime import datetime
from webpages.models.reservation import Reservation

now = datetime.now()
completed_reservations = Reservation.objects.filter(status='AP', end_time__lte=now)

for reservation in completed_reservations:
    reservation.status = 'CO'
    reservation.save()


