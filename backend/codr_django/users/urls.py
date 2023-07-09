from django.urls import path
from . import views

urlpatterns = [
    path(
        "api/register",
        views.UserRegisterView.as_view(),
    )
]
