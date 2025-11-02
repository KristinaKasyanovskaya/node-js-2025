import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { resolvePath } from './utils.js';

export async function compressFile(currentDirectory, sourcePath, destPath) {
  try {
    const sourceFullPath = resolvePath(currentDirectory, sourcePath);
    const destFullPath = resolvePath(currentDirectory, destPath);
    
    const readStream = createReadStream(sourceFullPath);
    const brotli = createBrotliCompress();
    const writeStream = createWriteStream(destFullPath);
    
    await pipeline(readStream, brotli, writeStream);
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function decompressFile(currentDirectory, sourcePath, destPath) {
  try {
    const sourceFullPath = resolvePath(currentDirectory, sourcePath);
    const destFullPath = resolvePath(currentDirectory, destPath);
    
    const readStream = createReadStream(sourceFullPath);
    const brotli = createBrotliDecompress();
    const writeStream = createWriteStream(destFullPath);
    
    await pipeline(readStream, brotli, writeStream);
  } catch (error) {
    console.log('Operation failed');
  }
}

