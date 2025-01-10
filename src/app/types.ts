export interface Slave {
  name: number;
  position: string;
  state: string;
}

export interface Parameter {
  name: string;
  index: number;
  bitLength: number;
  dataType: number;
  objAccess: number;
  subindex: number;
  objectCode: number;
}
