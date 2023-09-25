FROM nikolaik/python-nodejs:python3.11-nodejs18-slim

WORKDIR /app

ADD . /app

RUN pip install --no-cache-dir -r requirements.txt

RUN npm install && npm run build:css

EXPOSE 8080

CMD ["gunicorn", "-c", "gunicorn_config.py", "app:app"]