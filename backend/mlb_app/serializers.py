from django.contrib.auth import models
from rest_framework.serializers import ModelSerializer, StringRelatedField
from mlb_app.models import League, Division, Team

class LeagueSerializer(ModelSerializer):
    class Meta:
        model = League
        fields = ['id', 'name', 'user', 'divisions', 'teams']
        depth = 2

    user = StringRelatedField()

class DivisionSerializer(ModelSerializer):
    class Meta:
        model = Division
        fields = ['id', 'name', 'user', 'teams']
        depth = 1

class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'