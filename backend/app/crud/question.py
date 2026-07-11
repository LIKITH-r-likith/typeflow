from sqlalchemy.orm import Session

from app.models.question import Question
from app.schemas.question import QuestionCreate, QuestionUpdate


def create_question(db: Session, question_in: QuestionCreate) -> Question:
    question = Question(
        form_id=question_in.form_id,
        title=question_in.title,
        description=question_in.description,
        type=question_in.type,
        required=question_in.required,
        placeholder=question_in.placeholder,
        order=question_in.order,
    )
    db.add(question)
    db.commit()
    db.refresh(question)
    return question


def get_questions_by_form(db: Session, form_id: int) -> list[Question]:
    return (
        db.query(Question)
        .filter(Question.form_id == form_id)
        .order_by(Question.order)
        .all()
    )


def get_question(db: Session, question_id: int) -> Question | None:
    return db.query(Question).filter(Question.id == question_id).first()


def update_question(db: Session, question_id: int, question_in: QuestionUpdate) -> Question | None:
    question = get_question(db, question_id)
    if not question:
        return None

    update_data = question_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(question, field, value)

    db.commit()
    db.refresh(question)
    return question


def delete_question(db: Session, question_id: int) -> bool:
    question = get_question(db, question_id)
    if not question:
        return False

    db.delete(question)
    db.commit()
    return True