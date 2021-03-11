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
  name: string;
  description: string;
  timePolicy: string;
  status?: string;
  questions?: string[] | any[];
  dateRegistered?: Date;
  updatedAt?: Date;
  owner: string | TestOwner;
}
