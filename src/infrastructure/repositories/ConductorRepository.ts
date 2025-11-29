import { supabase } from '../../infrastructure/database/supabase';
import { Conductor } from '../../domain/entities/Database';

export class ConductorRepository {
    async findAll(): Promise<Conductor[]> {
        const { data, error } = await supabase
            .from('conductores')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw new Error(error.message);
        return data || [];
    }

    async findById(id: number): Promise<Conductor | null> {
        const { data, error } = await supabase
            .from('conductores')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw new Error(error.message);
        }
        return data;
    }

    async create(conductor: Omit<Conductor, 'id' | 'created_at' | 'updated_at'>): Promise<Conductor> {
        const { data, error } = await supabase
            .from('conductores')
            .insert(conductor)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async update(id: number, conductor: Partial<Omit<Conductor, 'id' | 'created_at' | 'updated_at'>>): Promise<Conductor> {
        const { data, error } = await supabase
            .from('conductores')
            .update(conductor)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from('conductores')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    }
}
