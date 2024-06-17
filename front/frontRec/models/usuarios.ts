export type Usuario = {
    id: number;
    email: string;
    telefone: string;
    date_joined: string;
    registrationNumber: string;
    phoneNumber: string;
    is_active: boolean;
    groups: Array<string>;
    user_permissions: Array<string>;
    name: string;
}