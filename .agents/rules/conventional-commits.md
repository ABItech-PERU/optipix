---
trigger: always_on
---

# Agent Commit Rules

Formato: `<tipo>(<ámbito>): <descripción>`
Una sola línea (sin cuerpo ni pie).

## Tipos

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`.

## Reglas

- **Longitud**: Máx 72 caracteres.
- **Idioma**: La `<descripción>` (tras los dos puntos) **DEBE ser en español**.
- **Formato**: Todo minúsculas, sin punto final.
- **Verbos**: Imperativo en español ("añadir", "corregir", "eliminar", "actualizar").

## Ejemplos

✅ `feat(ui): añadir botón de descarga`
✅ `fix(api): corregir error en la validación de archivos`
✅ `perf(core): implementar cola de procesamiento`
✅ `chore(deps): actualizar dependencias del proyecto`
❌ `feat(auth): add login` (Error: descripción en inglés)
❌ `Feat: Añadido login.` (Error: mayúscula inicial, falta ámbito, verbo no imperativo)

> **@Agent:** Respeta esto estrictamente en cada git commit o merge.
> **@Agent:** Separa los cambios en múltiples commits si pertenecen a módulos o ámbitos distintos (commits atómicos). No mezcles cosas diferentes en un solo commit.
