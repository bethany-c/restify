# Generated by Django 4.2 on 2023-04-17 01:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webpages', '0003_propertyrating_reservation_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyrating',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='property_user_rating', to=settings.AUTH_USER_MODEL),
        ),
    ]