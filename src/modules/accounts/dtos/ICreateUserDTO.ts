interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  is_admin: boolean;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
