export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart
}) => {
  return `
You are a STRICT JSON generator for an exam preparation system.

⚠️ VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes "
- NO comments, NO trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values

TASK:
Convert the given topic into exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language
- Notes MUST be Markdown formatted
- Headings and bullet points only

REVISION MODE RULES (CRITICAL):
- If REVISION MODE is ON:
  - Notes must be VERY SHORT
  - Only bullet points
  - One-line answers only
  - Definitions, formulas, keywords
  - No paragraphs
  - No explanations
  - Content must feel like:
    - last-day revision
    - 5-minute exam cheat sheet
  - revisionPoints MUST summarize ALL important facts

- If REVISION MODE is OFF:
  - Notes must be DETAILED but exam-focused
  - Each topic should include:
    - definition
    - short explanation
    - examples (if applicable)
  - Paragraph length: max 2–4 lines
  - No storytelling, no extra theory

IMPORTANCE RULES:
- Divide sub-topics into THREE categories:
  - ⭐ Very Important Topics
  - ⭐⭐ Important Topics
  - ⭐⭐⭐ Frequently Asked Topics
- All three categories MUST be present
- Base importance on exam frequency and weightage

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
  - diagram.data MUST be STRICT VALID Mermaid syntax
  - diagram.data MUST be a SINGLE escaped JSON string
  - diagram.data MUST ALWAYS start exactly with:
    graph TD

  - EVERY node MUST follow this format:
    A[Label]
    B[Another Label]

  - ALL edges MUST follow this format:
    A --> B

  - NEVER write plain text nodes like:
    Users --> Web Portal

  - ALWAYS assign node IDs:
    A, B, C, D...

  - VALID example:
    graph TD
    A[User] --> B[Web Portal]
    B --> C[Database]

  - INVALID example:
    graph TD User --> Web Portal

  - NEVER place node labels directly after graph TD
  - NEVER use parentheses ()
  - NEVER use special symbols inside labels
  - NEVER generate malformed Mermaid

  - Labels may contain:
    - letters
    - numbers
    - spaces

  - Every line after graph TD must contain either:
    - node declaration
    - edge declaration

  - Keep diagrams SIMPLE and SMALL
  - Maximum 8 nodes

- If INCLUDE DIAGRAM is NO:
  - diagram.data MUST be ""
  
MERMAID VALIDATION RULES:
- graph TD must be followed by a newline
- Every edge must connect node IDs only
- Node labels must always be inside square brackets
- Do not generate invalid Mermaid syntax
- Output must be directly renderable by Mermaid without preprocessing

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
  - charts array MUST NOT be empty
  - Generate at least ONE chart
  - Choose chart based on topic type:
    - THEORY topic → bar or pie (importance / weightage)
    - PROCESS topic → bar or line (steps / stages)
  - Use numeric values ONLY
  - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
  - charts MUST be []

CHART TYPES ALLOWED:
- bar
- line
- pie

CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    { "name": "string", "value": 10 }
  ]
}

STRICT JSON FORMAT (DO NOT CHANGE):

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart | graph | process",
    "data": ""
  },
  "charts": []
}

RETURN ONLY VALID JSON.
`;
};