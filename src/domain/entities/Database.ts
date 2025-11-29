export interface Conductor {
    id: number;
    nombre: string;
    paquetes_asignados: number;
    created_at: string;
    updated_at: string;
}

export interface Paquete {
    id: number;
    direccion_recogida: string;
    direccion_destino: string;
    conductor_asignado: number | null;
    created_at: string;
    updated_at: string;
}
