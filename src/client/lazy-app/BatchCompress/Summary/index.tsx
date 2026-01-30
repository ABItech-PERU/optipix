/**
 * Resumen de estadísticas de compresión por lote
 */
import { h, Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { formatBytes, calculateSavings } from '../utils';

interface Props {
  totalOriginalSize: number;
  totalCompressedSize: number;
}

export default class Summary extends Component<Props> {
  render({ totalOriginalSize, totalCompressedSize }: Props) {
    const savings = calculateSavings(totalOriginalSize, totalCompressedSize);
    const savingsValue = parseFloat(savings.replace('%', ''));

    return (
      <div class={style.summary}>
        <div class={style.summaryCard}>
          <div class={style.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1C6CCD"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <div class={style.content}>
            <span class={style.label}>Tamaño Original</span>
            <strong class={style.value}>
              {formatBytes(totalOriginalSize)}
            </strong>
          </div>
        </div>

        <div class={style.summaryCard}>
          <div class={style.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF6B6B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div class={style.content}>
            <span class={style.label}>Tamaño Comprimido</span>
            <strong class={style.value}>
              {formatBytes(totalCompressedSize)}
            </strong>
          </div>
        </div>

        <div class={style.summaryCard}>
          <div class={style.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(251, 190, 27, 0.5)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          </div>
          <div class={style.content}>
            <span class={style.label}>Ahorro Total</span>
            <strong
              class={`${style.value} ${style.savings} ${
                savingsValue > 50 ? style.highSavings : ''
              }`}
            >
              {savings}
            </strong>
          </div>
        </div>
      </div>
    );
  }
}
