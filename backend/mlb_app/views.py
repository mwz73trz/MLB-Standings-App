from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from mlb_app.serializers import LeagueSerializer, DivisionSerializer, TeamSerializer
from mlb_app.models import League, Division, Team

class LeagueViewSet(ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

class DivisionViewSet(ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer

class TeamViewSet(ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
