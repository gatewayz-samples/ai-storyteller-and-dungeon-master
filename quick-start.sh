#!/bin/bash

# Quick Start Script for AI Storyteller & Dungeon Master
# This script helps you get started quickly

echo "🎭 AI Storyteller & Dungeon Master - Quick Start"
echo "=================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Creating .env from template..."
    cp .env.example .env
    echo "✅ .env file created. Please edit it and add your Gatewayz API key."
    echo ""
    exit 1
fi

# Check if API key is set
if grep -q "your_api_key_here" .env; then
    echo "⚠️  Warning: API key not configured!"
    echo "Please edit .env and replace 'your_api_key_here' with your actual Gatewayz API key."
    echo ""
    exit 1
fi

echo "✅ Environment configured"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo ""

    # Detect package manager
    if command -v bun &> /dev/null; then
        echo "Using Bun..."
        bun install
    elif command -v npm &> /dev/null; then
        echo "Using npm..."
        npm install
    else
        echo "❌ Error: No package manager found!"
        echo "Please install Node.js or Bun first."
        exit 1
    fi

    echo ""
    echo "✅ Dependencies installed"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Start the dev server
echo "🚀 Starting development server..."
echo ""
echo "The app will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

if command -v bun &> /dev/null; then
bun dev
elif command -v npm &> /dev/null; then
    npm run dev
else
    echo "❌ Error: No package manager found!"
    exit 1
fi
