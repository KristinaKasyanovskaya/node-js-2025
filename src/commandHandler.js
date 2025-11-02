import { navigateUp, changeDirectory, listDirectory } from './navigation.js';
import { 
  readFile, 
  createFile, 
  createDirectory, 
  renameFile, 
  copyFile, 
  moveFile, 
  deleteFile 
} from './fileOperations.js';
import { getOSInfo } from './osInfo.js';
import { calculateHash } from './hash.js';
import { compressFile, decompressFile } from './compression.js';

export async function handleCommand(command, currentDirectory) {
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0];
  
  try {
    switch (cmd) {
      case 'up':
        return { newDirectory: navigateUp(currentDirectory) };
      
      case 'cd':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        return { newDirectory: await changeDirectory(currentDirectory, parts[1]) };
      
      case 'ls':
        await listDirectory(currentDirectory);
        return {};
      
      case 'cat':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        await readFile(currentDirectory, parts[1]);
        return {};
      
      case 'add':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        await createFile(currentDirectory, parts[1]);
        return {};
      
      case 'mkdir':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        await createDirectory(currentDirectory, parts[1]);
        return {};
      
      case 'rn':
        if (parts.length < 3) {
          console.log('Invalid input');
          return {};
        }
        await renameFile(currentDirectory, parts[1], parts[2]);
        return {};
      
      case 'cp':
        if (parts.length < 3) {
          console.log('Invalid input');
          return {};
        }
        await copyFile(currentDirectory, parts[1], parts[2]);
        return {};
      
      case 'mv':
        if (parts.length < 3) {
          console.log('Invalid input');
          return {};
        }
        await moveFile(currentDirectory, parts[1], parts[2]);
        return {};
      
      case 'rm':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        await deleteFile(currentDirectory, parts[1]);
        return {};
      
      case 'os':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        getOSInfo(parts[1]);
        return {};
      
      case 'hash':
        if (parts.length < 2) {
          console.log('Invalid input');
          return {};
        }
        await calculateHash(currentDirectory, parts[1]);
        return {};
      
      case 'compress':
        if (parts.length < 3) {
          console.log('Invalid input');
          return {};
        }
        await compressFile(currentDirectory, parts[1], parts[2]);
        return {};
      
      case 'decompress':
        if (parts.length < 3) {
          console.log('Invalid input');
          return {};
        }
        await decompressFile(currentDirectory, parts[1], parts[2]);
        return {};
      
      default:
        console.log('Invalid input');
        return {};
    }
  } catch (error) {
    return {};
  }
}

