/**
 * Lista de archivos en procesamiento por lote
 */
import { h, Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { formatBytes, calculateSavings } from '../utils';
import Thumbnail from './Thumbnail';

export interface ProcessedFile {
  originalFile: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number | null;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  downloadUrl?: string;
  downloadFilename?: string;
}

interface Props {
  files: ProcessedFile[];
  onRetry: (index: number) => void;
  onRemove?: (index: number) => void;
}

export default class FileList extends Component<Props> {
  render({ files, onRetry, onRemove }: Props) {
    return (
      <div class={style.fileList}>
        {files.map((file, idx) => {
          const savings = file.compressedSize
            ? calculateSavings(file.originalSize, file.compressedSize)
            : null;
          const ext =
            file.originalFile.name.split('.').pop()?.toUpperCase() || '';
          const statusClass =
            file.status === 'pending'
              ? style.statusPending
              : file.status === 'processing'
              ? style.statusProcessing
              : file.status === 'completed'
              ? style.statusCompleted
              : style.statusError;
          // calcular ahorro numérico (positivo = reducción)
          const numericSavings = file.compressedSize
            ? ((file.originalSize - file.compressedSize) / file.originalSize) *
              100
            : 0;
          const savingsDisplay = file.compressedSize
            ? `${numericSavings >= 0 ? '-' : '+'}${Math.abs(
                numericSavings,
              ).toFixed(0)}%`
            : null;
          const savingsClass =
            numericSavings >= 0 ? style.savingsPositive : style.savingsNegative;
          const typeBadgeStyle = (() => {
            const k: any = {};
            const e = ext.toUpperCase();
            if (e === 'JPG' || e === 'JPEG') {
              k.backgroundColor = 'rgba(6,182,212,0.12)';
              k.color = '#06b6d4';
            } else if (e === 'PNG') {
              k.backgroundColor = 'rgba(34,197,94,0.08)';
              k.color = '#22c55e';
            } else {
              k.backgroundColor = 'rgba(255,255,255,0.04)';
              k.color = 'var(--white)';
            }
            return k;
          })();

          return (
            <div key={idx} class={style.fileItem}>
              <div class={style.fileMain}>
                <div class={style.leftGroup}>
                  <div class={style.thumbWrap}>
                    <Thumbnail
                      file={file.originalFile}
                      alt={file.originalFile.name}
                      class={style.thumb}
                    />
                  </div>

                  <div class={style.fileInfo}>
                    <div class={style.fileName} title={file.originalFile.name}>
                      {file.originalFile.name}
                    </div>

                    <div class={style.metaRow}>
                      <span class={style.typeBadge} style={typeBadgeStyle}>
                        {ext}
                      </span>
                      <span class={style.fileSize}>
                        {formatBytes(file.originalSize)}
                      </span>
                    </div>
                  </div>
                </div>

                <div class={style.rightGroup}>
                  <div class={style.savingsCol}>
                    {savings ? (
                      <div class={style.savingsInner}>
                        <div class={`${style.savingsPercent} ${savingsClass}`}>
                          {savingsDisplay}
                        </div>
                        <div class={style.compressedSize}>
                          {file.compressedSize
                            ? formatBytes(file.compressedSize)
                            : ''}
                        </div>
                      </div>
                    ) : (
                      <div class={`${style.statusSmall} ${statusClass}`}>
                        {file.status === 'processing' && (
                          <svg class={style.spinner} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                            <path d="M12 2a10 10 0 0 1 10 10"></path>
                          </svg>
                        )}
                        {file.status === 'pending'
                          ? 'Pendiente'
                          : file.status === 'processing'
                          ? 'Optimizando...'
                          : file.status === 'error'
                          ? 'Error'
                          : '—'}
                      </div>
                    )}
                  </div>

                  <div class={style.fileActions}>
                    {onRemove && file.status !== 'processing' && (
                      <button
                        class={style.removeButton}
                        onClick={() => onRemove(idx)}
                        title="Eliminar"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    )}

                    {file.status === 'error' && (
                      <button
                        class={style.retryButton}
                        onClick={() => onRetry(idx)}
                      >
                        Reintentar
                      </button>
                    )}

                    {file.downloadUrl &&
                      file.downloadFilename &&
                      (() => {
                        const outExt =
                          file.downloadFilename
                            .split('.')
                            .pop()
                            ?.toUpperCase() || '';
                        return (
                          <a
                            href={file.downloadUrl}
                            download={file.downloadFilename}
                            class={style.downloadButton}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class={style.downloadIcon}
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span class={style.downloadLabel}>{outExt}</span>
                          </a>
                        );
                      })()}
                  </div>
                </div>
              </div>

              {file.error && <div class={style.errorMessage}>{file.error}</div>}
            </div>
          );
        })}
      </div>
    );
  }
}
