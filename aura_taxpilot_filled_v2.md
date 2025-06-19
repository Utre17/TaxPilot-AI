
# 🧠 AURA Framework – AI-Driven UI Design System  
**Project:** TaxPilot AI – Swiss Tax Intelligence for SMEs  

---

### 🎯 1. AUDIENCE

**Target user:**  
Swiss SME owners, fiduciary firms, startup founders, and financial managers

**Industry:**  
Finance, Accounting, Tax Compliance

**Technical level:**  
Low to medium (non-technical users, business professionals)

**Visual preferences:**  
Professional, minimalist, trustworthy, high-readability layouts with a Swiss aesthetic (clarity, order, precision)

---

### 🧠 2. USE CASE

**Screen Purpose:**  
- Public landing page to explain product and capture leads  
- Tax health flow: collect company data and assess current setup  
- Dashboard: show risk alerts, tax score, AI insights, and deadlines  
- PDF report generation: download branded analysis for stakeholders  
- Optional: Upgrade screen for Pro features (monitoring, alerts, updates)

---

### 🎨 3. VISUAL RULES (Design Tokens & System)

```
Framework: Tailwind CSS v3.4 + Shadcn UI + Framer Motion
Grid: 12-column, max-w-screen-xl, gap-6, p-8  
Typography:  
• Headings – text-4xl font-bold  
• Body – text-base text-muted-foreground  
Color system:  
• Primary: primary-600 (#1E3A8A Swiss Blue)  
• Background: gray-100  
Border radius: rounded-xl  
Spacing scale: 4 / 6 / 8 / 12  
Interactions: Hover – scale-105 + shadow-md  
Responsive: Mobile-first  
```

**Customize:**
```
Primary color: #1E3A8A  
Font style: Inter / Helvetica Neue  
Card style: Shadow-sm, rounded-xl, light borders  
Border treatment: Consistent, subtle, rounded-xl
```

---

### 🧩 4. ARCHITECTURE (Layout & Component Logic)

```
If SaaS dashboard → sidebar + top nav + card grid + modals  
If landing page → hero → features → testimonials → CTA  
If portal → sign-in → overview → tabbed dashboard  
```

**Shadcn Components to Use:**
```
• Card (metrics, features, list blocks)  
• Button (primary, ghost, disabled, loading)  
• Input, Textarea, Select (forms)  
• Tabs, Avatar, Dialog, DropdownMenu, Badge  
```

**Layout Prompt Strategy:**
```
Let AI infer layout from use case. Prioritize:  
• Clear visual hierarchy  
• Responsive, mobile-first design  
• Balanced spacing (8px grid)  
• Minimalism, no clutter  
• Use cards or sections for content grouping  
```

**Manual override layout example:**
```
Landing Page → Hero → Features Grid → Testimonials → CTA → Footer  
Dashboard → Sidebar + Topnav → Tax Health → Recommendations → Alerts  
```

---

### 📊 5. DATA STATES TO HANDLE

```
- [x] Loading  
- [x] Empty  
- [x] Error  
- [x] Success / Confirmation  

Prompt tip: “Add empty, error, and loading states with visuals and brief copy.”
```

---

### 🧱 6. COMPONENT VARIANTS (for AI consistency)

```
- Button: primary / ghost / loading / disabled  
- Card: metric / CTA / table / empty  
- Input: default / icon prefix / with error  
- Modal: default / form / confirm  
```

---

### 🔧 7. AI OUTPUT TYPE (What do you want the AI to give?)

```
- [x] Section-by-section UI layout (text-based plan)  
- [x] Tailwind + Shadcn React code  
- [ ] Wireframe sketch (Figma layout format)  
- [ ] Visual UI mockup (image generator prompt)  
```

---

## 💬 MASTER AI PROMPT TEMPLATE

```
🎯 Audience: Swiss SME owners, fiduciaries  
🧠 Use Case: [Insert screen — e.g. Tax Optimization Dashboard]  
🎨 Visual Rules:  
- Tailwind CSS v3.4 + Shadcn UI  
- 12-column layout, max-w-screen-xl, spacing scale 4/6/8  
- Heading: text-4xl font-bold, body: text-muted-foreground  
- Primary-600 accents (#1E3A8A), gray-100 background, rounded-xl  
- Hover: scale-105, shadow-md  

📦 Component Strategy:  
Use cards, inputs, buttons, modals from shadcn/ui with defined variants.

📐 Layout Logic:  
Auto-select layout based on use case. Ensure:  
- Clear hierarchy  
- Responsive flow  
- Minimal clutter  
- Support for loading/empty/error states  

Output format: Tailwind + Shadcn React component code
```

---

## ✅ DESIGN QUALITY CHECKLIST (Post-AI Review)

| ✅ Visual Quality                          | Pass?     |
|-------------------------------------------|-----------|
| Grid & alignment follow 8px rhythm        | ✅        |
| Typography hierarchy is clear             | ✅        |
| Consistent spacing & padding              | ✅        |
| Buttons/input sizes accessible            | ✅        |
| Hover, active, and focus states present   | ✅        |
| Color contrast is readable (AA/AAA)       | ✅        |
| Empty & error states handled              | ✅        |
| Mobile layout works / collapses well      | ✅        |
| No unnecessary elements or decoration     | ✅        |

---
