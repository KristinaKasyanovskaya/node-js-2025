import { createReadStream, createWriteStream } from 'fs';
import { open, mkdir, rename, unlink, stat } from 'fs/promises';
import { resolvePath } from './utils.js';
import { basename, join, dirname } from 'path';
import { pipeline } from 'stream/promises';

export async function readFile(currentDirectory, filePath) {
  try {
    const fullPath = resolvePath(currentDirectory, filePath);
    const readStream = createReadStream(fullPath, { encoding: 'utf8' });
    
    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    
    await new Promise((resolve, reject) => {
      readStream.on('end', () => {
        console.log();
        resolve();
      });
      readStream.on('error', reject);
    });
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function createFile(currentDirectory, fileName) {
  try {
    const fullPath = resolvePath(currentDirectory, fileName);
    const fileHandle = await open(fullPath, 'w');
    await fileHandle.close();
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function createDirectory(currentDirectory, dirName) {
  try {
    const fullPath = resolvePath(currentDirectory, dirName);
    await mkdir(fullPath);
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function renameFile(currentDirectory, oldPath, newFileName) {
  try {
    const oldFullPath = resolvePath(currentDirectory, oldPath);
    const stats = await stat(oldFullPath);
    
    if (!stats.isFile()) {
      console.log('Operation failed');
      return;
    }
    
    const oldDir = dirname(oldFullPath);
    const newFullPath = join(oldDir, newFileName);
    
    await rename(oldFullPath, newFullPath);
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function copyFile(currentDirectory, sourcePath, destPath) {
  try {
    const sourceFullPath = resolvePath(currentDirectory, sourcePath);
    const destFullPath = resolvePath(currentDirectory, destPath);
    
    const sourceStats = await stat(sourceFullPath);
    if (!sourceStats.isFile()) {
      console.log('Operation failed');
      return;
    }

    let finalDestPath = destFullPath;
    try {
      const destStats = await stat(destFullPath);
      if (destStats.isDirectory()) {
        finalDestPath = join(destFullPath, basename(sourceFullPath));
      }
    } catch (error) {
    }
    
    const readStream = createReadStream(sourceFullPath);
    const writeStream = createWriteStream(finalDestPath);
    
    await pipeline(readStream, writeStream);
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function moveFile(currentDirectory, sourcePath, destPath) {
  try {
    const sourceFullPath = resolvePath(currentDirectory, sourcePath);
    await copyFile(currentDirectory, sourcePath, destPath);
    await unlink(sourceFullPath);
  } catch (error) {
    console.log('Operation failed');
  }
}

export async function deleteFile(currentDirectory, filePath) {
  try {
    const fullPath = resolvePath(currentDirectory, filePath);
    const stats = await stat(fullPath);
    
    if (!stats.isFile()) {
      console.log('Operation failed');
      return;
    }
    
    await unlink(fullPath);
  } catch (error) {
    console.log('Operation failed');
  }
}

