# 📁 Public Folder — Your CV PDFs Go Here

## Active CV
Place your **main CV PDF** here and name it:
```
cv.pdf
```
This is the file that gets downloaded when visitors click "Download CV" on the website.

---

## Multiple CV Versions

Keep different versions for different audiences:

| Filename | Use Case |
|----------|----------|
| `cv.pdf` | **Active** — what visitors download |
| `cv-consulting.pdf` | For consulting firm applications |
| `cv-operations.pdf` | For operations/management roles |
| `cv-marketing.pdf` | For marketing roles |
| `cv-finance.pdf` | For finance roles |
| `cv-tech.pdf` | For tech/analytics roles |

### To switch the active CV:
```bash
cp cv-consulting.pdf cv.pdf
```

---

## Important Notes
- The active CV **must** be named `cv.pdf` (lowercase, with .pdf extension)
- Keep file size under 2MB for fast downloads
- If `cv.pdf` is missing, the site falls back to a text version
