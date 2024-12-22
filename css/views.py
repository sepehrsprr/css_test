from django.http import JsonResponse

def check_auth(request):
    return JsonResponse({
        'isAuthenticated': request.user.is_authenticated
    }) 