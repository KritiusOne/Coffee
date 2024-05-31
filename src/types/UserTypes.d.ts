export interface LoginResponse {
  access_token: string;
  token_type:   string;
}

export interface User {
  id_usuario: number;
  role:       Role;
  first_name: string;
  last_name:  string;
  username:   string;
  phone:      string;
  email:      string;
  address:    Address;
  exp?:        number;
}

export interface Address {
  id_address:  number;
  city:        string;
  state:       string;
  country:     string;
  description: string;
}

export interface Role {
  id_role:   number;
  role_name: string;
}
