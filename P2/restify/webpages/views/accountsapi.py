from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.generics import RetrieveAPIView, ListAPIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate


    

from rest_framework.generics import RetrieveAPIView, CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.views import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.settings import api_settings
from webpages.serializers.serializer_user import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# signup 
class SignupAPIView(CreateAPIView):
    # takes only post request
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'user': serializer.data, 'message': 'User created successfully'})

from rest_framework.authtoken.models import Token

# login 
# class LoginAPIView(APIView):
#     permission_classes = [AllowAny]
#     # automatically takes care of checking for blacklisted tokens
#     # authentication_classes = [JWTAuthentication]

#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(username=username, password=password)

#         if user is not None:
#             # Create JWT token
#             jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#             jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

#             payload = jwt_payload_handler(user)
#             token = jwt_encode_handler(payload)

#             return Response({'token': token})
#         else:
#             return Response({'error': 'Invalid credentials'})
        
# logout 
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            # blacklisting the token
            token.blacklist()
            return Response({"message": "Successfully logged out."})
        except Exception:
            return Response({"error": "Invalid refresh token."}, status=400)

# view profile
class UserProfileAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
# edit profile 
class UserProfileEditAPIView(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    


    

