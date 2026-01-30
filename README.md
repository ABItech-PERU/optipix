# OptiPix

**Imágenes ligeras** - Optimizá tus pixels al instante.

OptiPix es una aplicación web de compresión de imágenes que reduce el tamaño de las imágenes a través de numerosos formatos.

## Características principales

- **Fácil compresión**: Reduce el tamaño de tus imágenes en segundos, manteniendo la calidad.
- **Privacidad total**: Todo se procesa en tu dispositivo, sin subir archivos a internet.
- **Interfaz simple**: Compara la imagen original y comprimida lado a lado.
- **Procesamiento en lote**: Comprime varias imágenes a la vez.
- **App instalable**: Úsala offline como app web en tu teléfono o PC.
- **Formatos avanzados**: Soporte para JPEG, PNG, WebP, AVIF y más para mejores resultados.
- **Personalización**: Ajusta límites de tamaño y configura el sitio según tus necesidades.

## Privacidad

OptiPix no envía tu imagen a un servidor. Todo el proceso de compresión de imágenes se realiza localmente.

Sin embargo, OptiPix utiliza Google Analytics para recopilar lo siguiente:

- [Datos básicos de visitantes](https://support.google.com/analytics/answer/6004245ref_topic=2919631).
- El valor del tamaño de la imagen antes y después.
- Si es OptiPix PWA, el tipo de instalación de OptiPix.
- Si es OptiPix PWA, la hora y fecha de instalación.

## Requisitos

Para desarrollar y ejecutar OptiPix, necesitas:

- **Node.js**: Versión 16 o superior (recomendado 18+).
- **npm**: Incluido con Node.js, versión 7+.
- **Git**: Para clonar el repositorio y manejo de versiones.
- **Sistema operativo**: Windows, macOS o Linux.

Asegúrate de tener estas herramientas instaladas antes de continuar.

## Desarrollo

Para desarrollar en OptiPix:

1. Clona el repositorio
1. Para instalar los paquetes de node, ejecuta:
   ```sh
   npm install
   ```
1. Luego construye la aplicación ejecutando:
   ```sh
   npm run build
   ```
1. Después de construir, inicia el servidor de desarrollo ejecutando:
   ```sh
   npm run dev
   ```

## Contribuir

OptiPix es un proyecto de código abierto que aprecia toda la participación de la comunidad. Para contribuir al proyecto, sigue la [guía de contribución](/CONTRIBUTING.md).

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0 - consulta el archivo [LICENSE](LICENSE) para más detalles.

Basado en el proyecto original [Squoosh](https://github.com/GoogleChromeLabs/squoosh) de Google Chrome Labs.

[optipix]: https://optipix.abitech.com.pe
