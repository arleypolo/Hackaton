import { supabase } from '../../infrastructure/database/supabase';
import { Paquete } from '../../domain/entities/Database';

export class PaqueteRepository {
    async findAll(): Promise<Paquete[]> {
        const { data, error } = await supabase
            .from('paquetes')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw new Error(error.message);
        return data || [];
    }

    async findById(id: number): Promise<Paquete | null> {
        const { data, error } = await supabase
            .from('paquetes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw new Error(error.message);
        }
        return data;
    }

    async findByConductor(conductorId: number): Promise<Paquete[]> {
        const { data, error } = await supabase
            .from('paquetes')
            .select('*')
            .eq('conductor_asignado', conductorId);

        if (error) throw new Error(error.message);
        return data || [];
    }

    async create(paquete: Omit<Paquete, 'id' | 'created_at' | 'updated_at'>): Promise<Paquete> {
        const { data, error } = await supabase
            .from('paquetes')
            .insert(paquete)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async update(id: number, paquete: Partial<Omit<Paquete, 'id' | 'created_at' | 'updated_at'>>): Promise<Paquete> {
        const { data, error } = await supabase
            .from('paquetes')
            .update(paquete)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from('paquetes')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    }

    async asignarConductor(paqueteId: number, conductorId: number): Promise<Paquete> {
        return this.update(paqueteId, { conductor_asignado: conductorId });
    }
}
