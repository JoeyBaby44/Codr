from django.shortcuts import render
from django.contrib.auth.models import User  # django already has a built in user model
from django.contrib.auth.hashers import make_password, check_password

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializer import UserSerializer


class UserView(APIView):  # added UserView to get all User information if needed
    def get(self, reseult, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users)
        return Response(serializer.data)


class UserRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        confirmPass = request.data.get("confirmPass")
        email = request.data.get("email")

        if not all([username, password, email]):
            return Response(
                {"Error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif password != confirmPass:
            return Response(
                {"Error": "Passwords don't match."},
            )
        elif len(username) < 6:
            return Response(
                {"Error": "Username must be at least 6 characters long"},
            )

        user = User.objects.create_user(
            username=username, email=email, password=password
        )

        print(f"USER : {user}")
        user = UserSerializer(user)

        return Response(user.data)


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        print("username", username)
        print("password", password)

        if not username and not password:
            return Response({"Error": "Username and password required to login."})

        if not username:
            return Response({"Error": "Username required to login."})

        if not password:
            return Response({"Error": "Password required to login."})

        user = User.objects.filter(username=username).first()
        print(password)
        print(user.password)

        if password == user.password:
            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response({"Error": "Invalid credentials."})
