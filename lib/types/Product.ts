export interface Product {
  id: string;
  nombre: string;
  precio: number;
  url_imagen: string;
  categoria: string;
  tienda: {
    nombre: string;
    calificacion: number;
  };
  calificacion: number;
  descripcion?: string;
}

export interface Category {
  id: string;
  nombre: string;
  emoji: string;
}