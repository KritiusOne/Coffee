import { Usuario } from "./UserTypes";

export interface Orders {
  id_order:    number;
  usuario:     Usuario;
  fecha_orden: Date;
  total_price: number;
  delivery:    Delivery;
  sellers:     Seller[];
}

export interface Delivery {
  id_delivery:        number;
  state:              EstadoDelivery;
  id_usuario:         number;
  code_following:     string;
  fecha_creacion:     Date;
  fecha_finalizacion: Date | null;
  fecha_modificacion: Date | null;
}

export interface EstadoDelivery {
  id_states:  number;
  name_state: string;
}

export interface Seller {
  id_order:    number;
  id_menu:     number;
  numbers:     number;
  price:       number;
  fecha_venta: Date;
}
export interface CreateOrder {
  total_price: number;
  items:       Item[];
}

export interface Item {
  id_menu: number;
  numbers: number;
  price:   number;
}
