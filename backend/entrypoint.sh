#!/bin/sh
set -e

echo "⏳ Waiting for database..."
sleep 5

echo "⚙️ Running prisma generate..."
python -m prisma generate

echo "📦 Running prisma db push..."
python -m prisma db push

echo "🚀 Starting FastAPI..."
exec uvicorn app:app --host 0.0.0.0 --port 8000
