from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=100, default="")
    password = models.CharField(max_length=18, default="")
    email = models.CharField(max_length=50, default="")
    is_admin = models.BooleanField(default=False, blank=True)

#created class topic to retrieve topics from frontend, assume it works for now
class Topic(models.Model):
    name = models.CharField(max_length=100)

class UserInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topics = models.ManyToManyField(Topic)






