import os
from urllib.parse import quote_plus
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

DB_USER = os.getenv("DB_USER")
RAW_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

if not all([DB_USER, RAW_PASSWORD, DB_HOST, DB_PORT, DB_NAME]):
    raise RuntimeError("Missing database settings. Check your .env file.")

ENCODED_PASSWORD = quote_plus(RAW_PASSWORD)

DATABASE_URL = (
    f"postgresql+psycopg2://"
    f"{DB_USER}:{ENCODED_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)



engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()