from sqlalchemy.orm import Session

from app.models.form import Form
from app.schemas.form import FormCreate, FormUpdate


def create_form(db: Session, form_in: FormCreate) -> Form:
    form = Form(
        title=form_in.title,
        description=form_in.description,
        status=form_in.status,
        user_id=form_in.user_id,
    )
    db.add(form)
    db.commit()
    db.refresh(form)
    return form


def get_forms(db: Session, skip: int = 0, limit: int = 100) -> list[Form]:
    return db.query(Form).offset(skip).limit(limit).all()


def get_form(db: Session, form_id: int) -> Form | None:
    return db.query(Form).filter(Form.id == form_id).first()


def update_form(db: Session, form_id: int, form_in: FormUpdate) -> Form | None:
    form = get_form(db, form_id)
    if not form:
        return None

    update_data = form_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(form, field, value)

    db.commit()
    db.refresh(form)
    return form


def delete_form(db: Session, form_id: int) -> bool:
    form = get_form(db, form_id)
    if not form:
        return False

    db.delete(form)
    db.commit()
    return True