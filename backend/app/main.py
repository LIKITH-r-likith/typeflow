from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models
from app.database.base import Base
from app.database.database import engine
from app.routers import forms, questions


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting TypeFlow Backend...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database Ready")
    yield
    print("🛑 Shutting down TypeFlow Backend...")


app = FastAPI(
    title="TypeFlow API",
    description="Backend API for the TypeFlow AI Form Builder",
    version="1.0.0",
    lifespan=lifespan,
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routers
# -----------------------------
app.include_router(forms.router)
app.include_router(questions.router)

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "🚀 TypeFlow Backend Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }