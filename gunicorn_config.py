"""
Usage: gunicorn -c gunicorn_config.py app:app
"""
import multiprocessing

bind = "0.0.0.0:8080" # pylint: disable=invalid-name
worker_class = 'eventlet' # pylint: disable=invalid-name
workers = multiprocessing.cpu_count() * 2 + 1
