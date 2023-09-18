"""
Usage: gunicorn -c gunicorn_config.py app:app
"""
import multiprocessing

BIND = "0.0.0.0:8080"
WORKER_CLASS = 'eventlet'
WORKERS = multiprocessing.cpu_count() * 2 + 1
