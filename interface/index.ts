import { type } from 'os';

export type User = {
    id: string;
    userName: string;
    name: string;
    password: string;
    email: string;
};

export type Enclosure = {
    enclosureName: string;
    currentCapacity: number;
    maxCapacity: number;
};

export type Animal = {
    id: string;
    animalName: number;
    age: number;
    gender: number;
    healthStatus: number;
};
