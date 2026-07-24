# AgroPrice AI — Python 3.13 FastAPI ML Service Container
FROM python:3.13-slim

WORKDIR /app

COPY ml_service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ml_service/ ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
