import { unlink } from 'node:fs/promises';

const databasePath = './data/festival.sqlite';

console.log('Resetting local database...');

try {
  await unlink(databasePath);
  console.log('Database deleted.');
} catch (error) {
  if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
    console.log('Database does not exist. Nothing to delete.');
  } else {
    throw error;
  }
}