from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('planner:index')
        else:
            messages.error(request, 'Invalid credentials')
    return render(request, 'accounts/login.html')

def signup_view(request):
    if request.method == 'POST':
        # Add your signup logic here
        pass
    return render(request, 'accounts/signup.html')

def logout_view(request):
    logout(request)
    return redirect('planner:index') 