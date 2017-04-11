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
