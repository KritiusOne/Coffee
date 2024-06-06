export interface LoginResponse {
  access_token: string;
  token_type:   string;
}

export interface User {
  id_usuario: number;
  role_name:   string;
  first_name: string;
  last_name:  string;
  username:   string;
  phone:      string | null;
  email:      string;
  city:        string;
  state:       string;
  country:     string;
  description: string;
  exp?:        number;
}

export interface Usuario {
  id_usuario: number;
  role:       Role;
  first_name: string;
  last_name:  string;
  username:   string;
  phone:      string;
  email:      string;
  address:    Address;
}

export interface Role {
  id_role:   number;
  role_name: string;
}
export interface Address {
  id_address:  number;
  city:        string;
  state:       string;
  country:     string;
  description: string;
}
