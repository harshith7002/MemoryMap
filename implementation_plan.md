# Goal Description
Refactor large `.tsx` frontend page components in the `app/` directory by breaking them down into smaller, more manageable sub-components. This will reduce clutter and improve code readability, while keeping the design and user experience absolutely identical.

## User Review Required
The extracted components will be placed in a `components/` subdirectory next to each page (e.g., `app/demo/components/`). To ensure the styling remains identical, these components will import the existing `page.module.css` from their parent directory.

## Open Questions
None. The structural changes are self-contained and isolated to the frontend.

## Proposed Changes

### `app/demo/page.tsx` (11.2 KB)
Will be refactored by extracting the 5 exhibition steps into their own components inside `app/demo/components/`.

#### [NEW] `app/demo/components/StepListen.tsx`
#### [NEW] `app/demo/components/StepUnderstand.tsx`
#### [NEW] `app/demo/components/StepPreserve.tsx`
#### [NEW] `app/demo/components/StepAsk.tsx`
#### [NEW] `app/demo/components/StepVerify.tsx`
#### [MODIFY] `app/demo/page.tsx`
- Import and use the new step components, passing the required state and props.

---

### `app/app/record/page.tsx` (8.9 KB)
Will be refactored by extracting the different recording states into their own components inside `app/app/record/components/`.

#### [NEW] `app/app/record/components/IdleState.tsx`
#### [NEW] `app/app/record/components/RecordingState.tsx`
#### [NEW] `app/app/record/components/ProcessingState.tsx`
#### [NEW] `app/app/record/components/DoneState.tsx`
#### [MODIFY] `app/app/record/page.tsx`
- Replace inline state JSX with the new components, passing down hooks and states.

---

### `app/app/knowledge/[id]/page.tsx` (5.7 KB) & `app/app/knowledge/demo-memory-1/page.tsx` (6.2 KB)
These pages share a lot of common UI elements. I will extract these reusable pieces into a shared `components/app/knowledge/` directory at the project root to dry up the code for both pages.

#### [NEW] `components/app/knowledge/MemoryHeader.tsx`
#### [NEW] `components/app/knowledge/MemoryAudioPlayer.tsx`
#### [NEW] `components/app/knowledge/MemorySection.tsx`
#### [MODIFY] `app/app/knowledge/[id]/page.tsx`
#### [MODIFY] `app/app/knowledge/demo-memory-1/page.tsx`
- Update both pages to use the shared components, passing styles down as props or importing the relevant CSS module.

---

### `app/app/experts/[id]/page.tsx` (4.4 KB)
Will be refactored by extracting the different profile sections into `app/app/experts/[id]/components/`.

#### [NEW] `app/app/experts/[id]/components/ExpertHeader.tsx`
#### [NEW] `app/app/experts/[id]/components/ExpertSkills.tsx`
#### [NEW] `app/app/experts/[id]/components/ContextualSearch.tsx`
#### [NEW] `app/app/experts/[id]/components/ExpertTimeline.tsx`
#### [MODIFY] `app/app/experts/[id]/page.tsx`
- Clean up the main page by composing these components.

## Verification Plan

### Automated Tests
- Run `npm run build` or `npx tsc --noEmit` to ensure no TypeScript or build errors are introduced.

### Manual Verification
- I will ask you to start the local Next.js development server and verify that the Demo page, Record page, Knowledge pages, and Expert profile page all look and function exactly as they did before the refactor.
