import { IUser } from './IUser';

export interface IPost{
    id: number;
    title: string;
    content: string;
    image: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user: IUser;
}