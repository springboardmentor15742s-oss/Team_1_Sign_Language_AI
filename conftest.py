import sys
import os

# Add the backend directory to sys.path so 'app' module is discoverable by pytest
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
