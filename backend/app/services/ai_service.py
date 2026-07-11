import json
import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set in the environment")

genai.configure(api_key=GEMINI_API_KEY)
_model = genai.GenerativeModel(
    model_name="gemini-2.0-flash"
)
_SYSTEM_INSTRUCTION = """You are a form generation engine.
Given a natural language prompt, generate a form definition.
Respond with ONLY valid JSON, no markdown, no code fences, no explanations.
The JSON must strictly follow this schema:
{
  "title": "string",
  "description": "string",
  "questions": [
    {
      "title": "string",
      "type": "short_answer | paragraph | multiple_choice | checkbox | dropdown | rating | email | phone | date",
      "required": true,
      "placeholder": "string"
    }
  ]
}
"""


def _extract_json(raw_text: str) -> str:
    text = raw_text.strip()

    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:]

    start = text.find("{")
    end = text.rfind("}")

    if start == -1 or end == -1 or end < start:
        raise ValueError("No valid JSON object found in model response")

    return text[start : end + 1]


def generate_form(prompt: str) -> dict:
    if not prompt or not prompt.strip():
        raise ValueError("Prompt must not be empty")

    try:
       response = _model.generate_content(
            f"{_SYSTEM_INSTRUCTION}\n\nUser Prompt:\n{prompt}"
        )
    except Exception as exc:
        raise RuntimeError(f"Gemini API request failed: {exc}") from exc

    raw_text = getattr(response, "text", None)
    if not raw_text:
        raise RuntimeError("Gemini returned an empty response")

    try:
        json_str = _extract_json(raw_text)
        data = json.loads(json_str)
    except (ValueError, json.JSONDecodeError) as exc:
        raise ValueError(f"Failed to parse Gemini response as JSON: {exc}") from exc

    if "title" not in data or "questions" not in data:
        raise ValueError("Generated JSON is missing required fields")

    if not isinstance(data["questions"], list):
        raise ValueError("'questions' field must be a list")

    return data