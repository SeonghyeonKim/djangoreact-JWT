from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from .token import account_activation_token

from django.http import HttpResponse

from django.shortcuts import redirect

from django.contrib.auth import login as auth_login


# class method 화 username 과 pw 가 들어오면 토큰 생성
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # 커스텀 클레임 추가하기 *수정 필요
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token


# Model Serializer
class RegisterSerializer(serializers.ModelSerializer):
    # 유저 이름 (부산대 이메일 아이디)
    username = serializers.CharField(max_length=100)
    # 비밀번호
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    # 비밀번호 확인
    passwordcheck = serializers.CharField(write_only=True, required=True)
    # 학과
    major = serializers.CharField(write_only=True, required=False)


    class Meta:
        model = User
        fields = ('username', 'password', 'passwordcheck','major')

    # 비밀번호 같은지 확인
    def validate(self, attrs):
        if attrs['password'] != attrs['passwordcheck']:
            raise serializers.ValidationError(
                {"password": "일치하지 않습니다."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])

        user.is_active = False
        user.save()

        message = render_to_string('api/user_activate_email.html', {
            'user': user,
            'domain': 'http://localhost:8000',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)).encode().decode(),
            'token': account_activation_token.make_token(user),
        })

        mail_subject = "[PNUstu] 회원가입 인증 메일입니다."
        user_email = user.username
        print(user_email)
        email = EmailMessage(mail_subject, message, to=[user_email])
        email.send()
        return validated_data
