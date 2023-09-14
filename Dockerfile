FROM nikolaik/python-nodejs:python3.11-nodejs20-slim

WORKDIR /app

ADD . /app

RUN pip install --no-cache-dir -r requirements.txt

RUN npm run build:css

EXPOSE 8080

CMD ["gunicorn", "-k", "eventlet", "-c", "gunicorn_config.py", "app:app"]