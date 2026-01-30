const __env: { [k: string]: string | undefined } =
  (typeof process !== 'undefined' && (process as any).env) ||
  (globalThis as any).__env ||
  {};

export const ALLOWED_UPLOAD_MIMES: string[] = (
  (__env.ALLOWED_UPLOAD_MIMES as string) ||
  'image/jpeg,image/png,image/webp,image/avif,image/jxl,image/qoi,image/svg+xml,image/svg'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const MAX_UPLOAD_BYTES: number = Number(
  __env.MAX_UPLOAD_BYTES || 20 * 1024 * 1024,
);

// Texto legible para mostrar el límite en MB si es necesario
export const MAX_UPLOAD_BYTES_HUMAN = `${Math.round(
  MAX_UPLOAD_BYTES / (1024 * 1024),
)} MB`;

export default {
  ALLOWED_UPLOAD_MIMES,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_BYTES_HUMAN,
};
