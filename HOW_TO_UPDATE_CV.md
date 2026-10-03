# 📄 How to Update Your CV (PDF Version)

Your website is set up to automatically download the CV from a PDF file in the `public/` folder. This makes it super easy to swap out different versions of your CV based on who's visiting your site.

## 🔄 How to Update Your CV

### Step 1: Locate the CV file
The CV file is at:
```
public/cv.pdf
```

### Step 2: Replace it with your new PDF
Simply:
1. Delete the old `public/cv.pdf` file
2. Place your new PDF file in the `public/` folder
3. Rename it to `cv.pdf`

That's it! The "Download CV" button on your website will now serve the updated PDF version.

---

## 💡 Pro Tip: Different CVs for Different Audiences

You can keep multiple PDF versions of your CV in the `public/` folder:

```
public/
├── cv.pdf                    ← Default CV (what gets downloaded)
├── cv-consulting.pdf         ← Consulting-focused version
├── cv-operations.pdf         ← Operations-focused version
├── cv-marketing.pdf          ← Marketing-focused version
├── cv-finance.pdf            ← Finance-focused version
└── cv-tech.pdf               ← Tech/Analytics-focused version
```

Then, to switch which CV gets downloaded, just:
- **Rename** your desired version to `cv.pdf`
- Or **copy** the desired PDF to `cv.pdf`

### Example workflow:
```bash
# If you're sending your site to a consulting firm:
cp public/cv-consulting.pdf public/cv.pdf

# If you're sending it to an operations role:
cp public/cv-operations.pdf public/cv.pdf

# If you're sending it to a tech/analytics role:
cp public/cv-tech.pdf public/cv.pdf
```

---

## 📝 PDF Format Tips

The CV is downloaded as a `.pdf` file. For best results:
- Use standard PDF format (exported from Word, Google Docs, LaTeX, etc.)
- Keep file size reasonable (under 2MB recommended)
- Use clear, professional formatting
- Ensure text is selectable (not just an image)

---

## 🌐 Updating Other Info

If you also want to update your contact info, LinkedIn URL, etc., those are in:
- **`src/App.tsx`** — All the buttons, links, and text on the website

Search for these strings to find them quickly:
- `9073549642` — Phone number
- `asreemany2000@gmail.com` — Email
- `linkedin.com/in/aritra-sreemany` — LinkedIn URL

---

## 🚀 Deploying Changes

After updating your CV or any content:
1. Save your changes
2. Run `npm run build` to rebuild the site
3. Re-deploy (the platform you're using will handle this)

---

## ✅ Quick Checklist

- [ ] CV PDF file is at `public/cv.pdf`
- [ ] CV PDF is up to date
- [ ] Phone, email, LinkedIn are correct in `src/App.tsx`
- [ ] Site builds without errors (`npm run build`)
