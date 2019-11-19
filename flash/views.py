from django.shortcuts import render

# Create your views here.
def index(request):
	return render(request, 'flash/index.html')

def wuhan(request):
	return render(request, 'flash/wuhan.html')

def hubei(request):
	return render(request, 'flash/hubei.html')

def show(request):
	return render(request, 'flash/show.html')

def single(request):
	return render(request, 'flash/single.html')

def handler404(request):
    return render(request, "flash/404.html", status=404)

def report(request):
    ctx = {}
    if request.POST:
        ctx['result'] = '我们已收到您的反馈!'
    return render(request, "flash/404.html", ctx)
