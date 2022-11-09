from django.urls import path
from . import views

from .views import (
    activate
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'api'

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('test/', views.testEndPoint, name='test'),

    path('activate/<str:uidb64>/<str:token>/', views.activate, name="activate"),
]