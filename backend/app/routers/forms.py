from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.crud import form as form_crud
from app.schemas.form import FormCreate, FormUpdate, FormResponse

router = APIRouter(prefix="/forms", tags=["forms"])


@router.post("", response_model=FormResponse, status_code=status.HTTP_201_CREATED)
def create_form(form_in: FormCreate, db: Session = Depends(get_db)):
    return form_crud.create_form(db, form_in)


@router.get("", response_model=list[FormResponse])
def get_forms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return form_crud.get_forms(db, skip=skip, limit=limit)


@router.get("/{form_id}", response_model=FormResponse)
def get_form(form_id: int, db: Session = Depends(get_db)):
    form = form_crud.get_form(db, form_id)
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return form


@router.put("/{form_id}", response_model=FormResponse)
def update_form(form_id: int, form_in: FormUpdate, db: Session = Depends(get_db)):
    form = form_crud.update_form(db, form_id, form_in)
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return form


@router.delete("/{form_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_form(form_id: int, db: Session = Depends(get_db)):
    deleted = form_crud.delete_form(db, form_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Form not found")