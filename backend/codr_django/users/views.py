from django.shortcuts import render
from django.contrib.auth.hashers import (
    make_password,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializer import InterestSerializer, UserSerializer
from .models import TopicsOfInterest

from django.contrib.auth.models import User


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
        elif User.objects.filter(username=username).first():
            return Response(
                {"Error": "Username taken."},
            )

        user = User.objects.create(username=username, email=email, password=password)

        print("id:", user.id)
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
        print("User:", user)
        print("Password:", password)
        print("User.Password:", user.password)

        if password == user.password:
            serializer = UserSerializer(user)
            return Response(serializer.data)

        return Response({"Error": "Invalid credentials."})


class UserInterestView(APIView):
    def post(self, request, *args, **kwargs):
        user_name = request.data.get("username")
        user_id = (User.objects.filter(username=user_name).first()).id

        user_interests = request.data.get("interests")

        user_interests = TopicsOfInterest.objects.create(
            user_id=user_id, topics=user_interests
        )

        return Response({"Message", "Interests updated"})
