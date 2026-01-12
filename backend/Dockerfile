FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential libpq-dev curl \
    && rm -rf /var/lib/apt/lists/*

COPY . /app
COPY 1337_Student_Han_dbook.pdf /app/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install prisma psycopg2-binary

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000


ENTRYPOINT ["/app/entrypoint.sh"]
# CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
