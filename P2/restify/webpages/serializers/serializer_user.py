from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models.user import RestifyUser, UserHistory
from webpages.models.property import Property 
from django.contrib.auth import get_user_model



class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'phone_number', 'host_or_not', 'avatar', 'password']

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserHistorySerializer(ModelSerializer):

    class Meta:
        model = UserHistory
        exclude = ('comment_for_this_user', )
    


