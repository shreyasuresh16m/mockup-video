# KONE SalesNXT

AI-powered visualisation tool for KONE sales teams.

## Architecture

- **Framework**: React + Vite (TypeScript), Express backend
- **Location**: `Mockup-UI-Page/` subdirectory
- **Port**: 5000
- **Workflow**: `Start application` → `cd Mockup-UI-Page && npm run dev`

## Page Hierarchy

```
Login → Dashboard → ProjectDetail → Home (workflow) → ProjectDetail
                                 ↘ Brochure
```

## Key Files

| File | Purpose |
|------|---------|
| `Mockup-UI-Page/client/src/types.ts` | Shared types: `Offering`, `Project`, `AppView` |
| `Mockup-UI-Page/client/src/App.tsx` | Root router / state manager |
| `Mockup-UI-Page/client/src/pages/Login.tsx` | Login screen |
| `Mockup-UI-Page/client/src/pages/Dashboard.tsx` | Project list |
| `Mockup-UI-Page/client/src/pages/ProjectDetail.tsx` | Offerings list per project |
| `Mockup-UI-Page/client/src/pages/Home.tsx` | 6-step offering workflow |
| `Mockup-UI-Page/client/src/pages/Brochure.tsx` | Sales brochure builder |

## Data Flow

1. **Login** → sets `view = "dashboard"`
2. **Dashboard** creates a `Project` → opens `ProjectDetail`
3. **ProjectDetail** → "New Offering" → opens `Home` (workflow)
4. **Home** step 6 → "Save & Return to Project" calls `onComplete({ components, useCases })` → App creates an `Offering`, pushes it to the project, returns to `ProjectDetail`
5. **ProjectDetail** offering card → "Build Brochure" → opens `Brochure`

## Component Images

Located in `Mockup-UI-Page/attached_assets/`:
- COP: `image_1773728556778.png`
- LCI: `image_1773728561376.png`
- Ceiling: `image_1773728565819.png`
- Door: `image_1773728572923.png`

## Standard Tender PDF

`Mockup-UI-Page/client/public/tender.pdf` — always shown as read-only preview in Brochure page regardless of upload.

## Brochure Editable Sections

1. Offering Overview
2. Competitor Comparison
3. Unique Selling Points (U.S.P.)
4. Customer Benefits (X.Y.Z.)
5. Additional Notes (A.B.C.)

## Deployment

Root `package.json` uses `postinstall` to install subdirectory deps:
```json
{ "scripts": { "postinstall": "cd Mockup-UI-Page && npm install" } }
```
