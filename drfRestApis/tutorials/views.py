from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Tutorial
from .serializers import TutorialSerializer

# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
  if request.method == 'GET':
    tutorials = Tutorial.objects.all()
    title = request.GET.get('title', None)
    if title is not None:
      tutorials = tutorials.filter(title__icontains=title)
    tutorials_serializer = TutorialSerializer(tutorials, many=True)
    return Response(tutorials_serializer.data, status=status.HTTP_200_OK)
  
  elif request.method == 'POST':
    tutorial_data = JSONParser().parse(request)
    tutorial_serializer = TutorialSerializer(data=tutorial_data)
    if tutorial_serializer.is_valid():
      tutorial_serializer.save()
      return Response(tutorial_serializer.data, status=status.HTTP_201_CREATED)
    return Response(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  else:
    count = Tutorial.objects.all().delete()
    return Response({'message': f'{count[0]} Tutorials were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
  # find tutorial by pk (id)
  try:
    tutorial = Tutorial.objects.get(pk=pk)
    if request.method == 'GET':
        tutorial_serializer = TutorialSerializer(tutorial)
        return Response(tutorial_serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
      tutorial_data = JSONParser().parse(request)
      tutorial_serializer = TutorialSerializer(tutorial, data=tutorial_data)
      if tutorial_serializer.is_valid():
        tutorial_serializer.save()
        return Response(tutorial_serializer.data)
      return Response(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:
      tutorial.delete()
      return Response({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
  
  except Tutorial.DoesNotExist:
        return Response({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)
  
@api_view(['GET'])
def tutorial_list_published(request):
    # GET all published tutorials
    tutorials = Tutorial.objects.filter(published=True)
    
    if request.method == 'GET':
      tutorial_serializer = TutorialSerializer(tutorials, many=True)
      return Response(tutorial_serializer.data, status=status.HTTP_200_OK)