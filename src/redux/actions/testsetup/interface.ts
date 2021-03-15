export interface AddTestParamType {
  name: string;
  description: string;
  timePolicy: string;
  status?: string;
}

export interface TestOwner {
  username: string;
  _id: string;
  email: string;
  profilePicture: string;
}

export interface Test {
  _id?: string;
  name: string;
  description: string;
  timePolicy: string;
  status?: string;
  questions?: string[] | any[];
  createdAt?: Date;
  updatedAt?: Date;
  owner: string | TestOwner;
}
