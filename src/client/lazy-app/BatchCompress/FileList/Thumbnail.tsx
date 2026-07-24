import { h, Component } from 'preact';

class TaskQueue {
  private queue: (() => Promise<void>)[] = [];
  private active = 0;
  
  constructor(private concurrency: number) {}

  add(task: () => Promise<void>) {
    return new Promise<void>((resolve, reject) => {
      this.queue.push(async () => {
        try {
          await task();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
      this.next();
    });
  }

  private next() {
    if (this.active >= this.concurrency || this.queue.length === 0) return;
    const task = this.queue.shift();
    if (task) {
      this.active++;
      task().finally(() => {
        this.active--;
        this.next();
      });
    }
  }
}

// Límite de 3 decodificaciones pesadas concurrentes
const thumbnailQueue = new TaskQueue(3);

interface Props {
  file: File;
  alt?: string;
  class?: string;
}

interface State {
  thumbUrl: string | null;
}

export default class Thumbnail extends Component<Props, State> {
  state: State = {
    thumbUrl: null,
  };
  
  private isMounted = false;

  async componentDidMount() {
    this.isMounted = true;
    await thumbnailQueue.add(() => this.generateThumbnail(this.props.file));
  }

  componentWillUnmount() {
    this.isMounted = false;
    if (this.state.thumbUrl) {
      URL.revokeObjectURL(this.state.thumbUrl);
    }
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.file !== this.props.file) {
      if (this.state.thumbUrl) {
        URL.revokeObjectURL(this.state.thumbUrl);
      }
      this.setState({ thumbUrl: null });
      await thumbnailQueue.add(() => this.generateThumbnail(this.props.file));
    }
  }

  private async generateThumbnail(file: File) {
    try {
      // Usar createImageBitmap nativo y asíncrono
      const bitmap = await createImageBitmap(file, {
        resizeWidth: 120, // Ancho de miniatura
        resizeQuality: 'low'
      });

      // Calcular altura para mantener aspecto
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(bitmap, 0, 0);
      
      // Obtener el blob de la versión miniatura
      canvas.toBlob((blob) => {
        if (!blob || !this.isMounted) return;
        
        const thumbUrl = URL.createObjectURL(blob);
        this.setState({ thumbUrl });
        
      }, 'image/jpeg', 0.8);
      
    } catch (e) {
      // Fallback si createImageBitmap falla o no está soportado para este formato
      if (!this.isMounted) return;
      const thumbUrl = URL.createObjectURL(file);
      this.setState({ thumbUrl });
    }
  }

  render({ alt, class: className }: Props, { thumbUrl }: State) {
    if (!thumbUrl) {
      // Skeleton loader mientras se genera la miniatura
      return (
        <div 
          class={className} 
          style={{ 
            backgroundColor: 'var(--blue-grey-800)', 
            width: '100%', 
            height: '100%',
            opacity: 0.5
          }} 
        />
      );
    }

    return (
      <img
        src={thumbUrl}
        alt={alt}
        class={className}
      />
    );
  }
}
