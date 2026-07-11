from pydantic import BaseModel, ConfigDict


class QuestionBase(BaseModel):
    title: str
    description: str | None = None
    type: str
    required: bool = False
    placeholder: str | None = None
    order: int = 0


class QuestionCreate(QuestionBase):
    form_id: int


class QuestionUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    type: str | None = None
    required: bool | None = None
    placeholder: str | None = None
    order: int | None = None


class QuestionResponse(QuestionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    form_id: int