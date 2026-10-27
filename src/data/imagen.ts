export const procesarFoto = (archivo: File, tamano = 256): Promise<string> =>
    new Promise((resolve, reject) => {
        if (!archivo.type.startsWith("image/")) {
            reject(new Error("El archivo debe ser una imagen."));
            return;
        }
        if (archivo.size > 5 * 1024 * 1024) {
            reject(new Error("La imagen no puede pesar más de 5 MB."));
            return;
        }

        const lector = new FileReader();
        lector.onerror = () => reject(new Error("No se pudo leer el archivo."));
        lector.onload = () => {
            const img = new Image();
            img.onerror = () => reject(new Error("No se pudo cargar la imagen."));
            img.onload = () => {
                const lado = Math.min(img.width, img.height);
                const sx = (img.width - lado) / 2;
                const sy = (img.height - lado) / 2;
                const canvas = document.createElement("canvas");
                canvas.width = tamano;
                canvas.height = tamano;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Tu navegador no soporta procesar imágenes."));
                    return;
                }
                ctx.drawImage(img, sx, sy, lado, lado, 0, 0, tamano, tamano);
                resolve(canvas.toDataURL("image/jpeg", 0.85));
            };
            img.src = lector.result as string;
        };
        lector.readAsDataURL(archivo);
    });
