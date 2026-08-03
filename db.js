import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

const adapter = new JSONFile(file);
const defaultData = {
  workload: [],
  coverage: [],
  forms: [],
  blog: [],
  stats: []
};

const db = new Low(adapter, defaultData);

await db.read();

export default db;
