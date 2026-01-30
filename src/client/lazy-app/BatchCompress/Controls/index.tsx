/**
 * Controles de configuración de compresión por lote
 */
import { h, Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import {
  EncoderState,
  EncoderType,
  encoderMap,
  EncoderOptions,
} from '../../feature-meta';

interface Props {
  encoderType: EncoderType;
  encoderState: EncoderState | null;
  isProcessing: boolean;
  progress: number;
  completedCount: number;
  totalFiles: number;
  onEncoderTypeChange: (e: Event) => void;
  onEncoderOptionsChange: (newOptions: EncoderOptions) => void;
  onProcessAll: () => void;
  onDownloadAll: () => void;
}

export default class Controls extends Component<Props> {
  render({
    encoderType,
    encoderState,
    isProcessing,
    progress,
    completedCount,
    totalFiles,
    onEncoderTypeChange,
    onEncoderOptionsChange,
    onProcessAll,
    onDownloadAll,
  }: Props) {
    const encoder = encoderMap[encoderType];
    const EncoderOptions = 'Options' in encoder ? encoder.Options : null;

    return (
      <div class={style.controls}>
        <div class={style.optionsScroller}>
          <h3 class={style.optionsTitle}>Comprimir</h3>

          <section class={`${style.optionOneCell} ${style.optionsSection}`}>
            <div class={style.selectWrapper}>
              <select value={encoderType} onChange={onEncoderTypeChange}>
                {Object.keys(encoderMap).map((key) => (
                  <option value={key}>
                    {encoderMap[key as EncoderType].meta.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {encoderState && EncoderOptions && (
            <div class={style.encoderOptions}>
              <EncoderOptions
                options={encoderState.options as any}
                onChange={onEncoderOptionsChange}
              />
            </div>
          )}
        </div>

        <div class={style.actionButtons}>
          <button
            class={style.processButton}
            onClick={onProcessAll}
            disabled={isProcessing}
          >
            {isProcessing
              ? `Optimizando... ${progress.toFixed(0)}%`
              : 'Procesar todas'}
          </button>

          <button
            class={style.downloadButton}
            onClick={onDownloadAll}
            disabled={isProcessing || completedCount === 0}
          >
            Descargar todo ({completedCount})
          </button>
        </div>
      </div>
    );
  }
}
