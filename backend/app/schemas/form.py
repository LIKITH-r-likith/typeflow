from datetime import datetime

from pydantic import BaseModel, ConfigDict


class FormBase(BaseModel):
    title: str
    description: str | None = None
    status: str = "draft"


class FormCreate(FormBase):
    user_id: int


class FormUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = None


class FormResponse(FormBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime