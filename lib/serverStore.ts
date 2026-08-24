import fs from 'fs/promises';
import path from 'path';
import { Memory } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseSchema {
  memories: Memory[];
}

async function ensureDbExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify({ memories: [] }, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Failed to ensure db exists', error);
  }
}

export async function getDb(): Promise<DatabaseSchema> {
  await ensureDbExists();
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Failed to read db', error);
    return { memories: [] };
  }
}

export async function saveDb(data: DatabaseSchema) {
  await ensureDbExists();
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write db', error);
  }
}

export async function getStoredMemories(): Promise<Memory[]> {
  const db = await getDb();
  return db.memories;
}

export async function saveNewMemory(newMemory: Omit<Memory, 'id' | 'catalogId' | 'createdAt'>): Promise<Memory> {
  const db = await getDb();
  const allCurrent = db.memories;
  const nextNum = allCurrent.length + 48; // starting from ARCH-0048 for consistency with demo data
  const catalogId = `ARCH-00${nextNum}`;
  const id = `user-memory-${Date.now()}`;

  const created: Memory = {
    ...newMemory,
    id,
    catalogId,
    tags: newMemory.tags || ['Intuition', 'Diagnostics'],
    createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  db.memories = [created, ...db.memories];
  await saveDb(db);
  
  return created;
}
