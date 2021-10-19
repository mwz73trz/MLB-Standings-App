from django.db import models
from django.contrib.auth.models import User

class League(models.Model):
    name = models.CharField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="leagues")

    def __str__(self):
        return f"{self.name}"

class Division(models.Model):
    name = models.CharField(max_length=150)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name="divisions")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="divisions")

    def __str__(self):
        return f"{self.name}"

class Team(models.Model):
    name = models.CharField(max_length=254)
    wins = models.SmallIntegerField(default=0)
    losses = models.SmallIntegerField(default=0)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name="teams")
    division = models.ForeignKey(Division, on_delete=models.CASCADE, related_name="teams")

    def __str__(self):
        return f"{self.name}"

