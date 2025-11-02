import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolvePath } from './utils.js';

export async function calculateHash(currentDirectory, filePath) {
  try {
    const fullPath = resolvePath(currentDirectory, filePath);
    const hash = createHash('sha256');
    const readStream = createReadStream(fullPath);
    
    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });
    
    await new Promise((resolve, reject) => {
      readStream.on('end', () => {
        console.log(hash.digest('hex'));
        resolve();
      });
      readStream.on('error', reject);
    });
  } catch (error) {
    console.log('Operation failed');
  }
}

