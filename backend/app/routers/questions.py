from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.crud import question as question_crud
from app.schemas.question import QuestionCreate, QuestionUpdate, QuestionResponse

router = APIRouter(tags=["questions"])


@router.post("/questions", response_model=QuestionResponse, status_code=status.HTTP_201_CREATED)
def create_question(question_in: QuestionCreate, db: Session = Depends(get_db)):
    return question_crud.create_question(db, question_in)


@router.get("/forms/{form_id}/questions", response_model=list[QuestionResponse])
def get_questions_by_form(form_id: int, db: Session = Depends(get_db)):
    return question_crud.get_questions_by_form(db, form_id)


@router.get("/questions/{question_id}", response_model=QuestionResponse)
def get_question(question_id: int, db: Session = Depends(get_db)):
    question = question_crud.get_question(db, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@router.put("/questions/{question_id}", response_model=QuestionResponse)
def update_question(question_id: int, question_in: QuestionUpdate, db: Session = Depends(get_db)):
    question = question_crud.update_question(db, question_id, question_in)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question


@router.delete("/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_question(question_id: int, db: Session = Depends(get_db)):
    deleted = question_crud.delete_question(db, question_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Question not found")