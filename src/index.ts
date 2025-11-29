import 'dotenv/config';
import { ConductorRepository } from './infrastructure/repositories/ConductorRepository';
import { PaqueteRepository } from './infrastructure/repositories/PaqueteRepository';

// Inicializar repositorios
const conductorRepo = new ConductorRepository();
const paqueteRepo = new PaqueteRepository();

console.log('✅ Conexión a Supabase configurada');
console.log('📦 Repositorios inicializados');

