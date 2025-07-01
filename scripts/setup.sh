#!/usr/bin/env bash
set -e

if ! command -v npm &>/dev/null; then
  echo "❌ npm is required. Please install NodeJS 18+"; exit 1;
fi

echo "📦 Installing node dependencies…"
npm ci

echo "🔧 Running type-check & tests…"
npm run lint && npm run test

echo "🐳 Building Docker images…"
docker compose build

echo "✅ Setup complete. Run 'docker compose up' to start the stack."