export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface User {
  gender: UserGender | null;
  name: {
    title: string | null;
    first: string;
    last: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  cell: string | null;
  login?: {
    uuid: string | null;
  };
}

export interface UsersResponse {
  results: User[];
  info: {
    results: number;
    page: number;
  };
}
