# Task 02: Initialize the project

Status: ✅ **DONE** — Project already initialized.

## Existing Infrastructure
- `package.json` with scripts: dev, build, preview, typecheck, test, test:e2e, check
- `vite.config.ts` with server port 8000
- `tsconfig.json` with strict mode enabled

## Scripts Available
| Script | Command | Purpose |
|--------|---------|---------|
| dev | `vite` | Development server on port 8000 |
| build | `tsc && vite build` | Production build |
| preview | `vite preview --port 8000` | Preview built app |
| typecheck | `tsc --noEmit` | Type checking without emitting |
| test | `vitest run` | Run Vitest unit tests |
| test:coverage | `vitest --coverage run` | Tests with coverage |
| check | `npm run typecheck && npm run test` | Full validation pipeline |
