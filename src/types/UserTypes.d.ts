export interface LoginResponse {
  access_token: string;
  token_type:   string;
}
export interface User {
  id_usuario:          number;
  role_name:           string;
  first_name:          string;
  last_name:           string;
  phone:               string;
  email:               string;
  city:                null;
  state:               null;
  country:             null;
  address_description: null;
  exp:                 number;
}