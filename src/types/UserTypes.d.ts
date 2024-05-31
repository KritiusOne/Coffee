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

export interface UserByGetAll {
  id_usuario: number;
  role:       Role;
  first_name: string;
  last_name:  string;
  username:   string;
  phone:      null;
  email:      string;
  address:    null;
}

export interface Role {
  id_role:   number;
  role_name: string;
}

