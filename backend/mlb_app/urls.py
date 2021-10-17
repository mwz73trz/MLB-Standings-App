from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeagueViewSet, DivisionViewSet, TeamViewSet

router = DefaultRouter()
router.register("leagues", LeagueViewSet, basename="league")
router.register("divisions", DivisionViewSet, basename="division")
router.register("teams", TeamViewSet, basename="team")

urlpatterns = [
    path('', include(router.urls)),
]