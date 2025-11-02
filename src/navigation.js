import { readdir, stat } from 'fs/promises';
import { resolvePath, getParentDirectory } from './utils.js';
import { basename } from 'path';

export function navigateUp(currentDirectory) {
  return getParentDirectory(currentDirectory);
}

export async function changeDirectory(currentDirectory, targetPath) {
  try {
    const newPath = resolvePath(currentDirectory, targetPath);
    const stats = await stat(newPath);
    
    if (!stats.isDirectory()) {
      console.log('Operation failed');
      return currentDirectory;
    }
    
    return newPath;
  } catch (error) {
    console.log('Operation failed');
    return currentDirectory;
  }
}

export async function listDirectory(currentDirectory) {
  try {
    const files = await readdir(currentDirectory);
    
    const items = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = resolvePath(currentDirectory, file);
          const stats = await stat(filePath);
          return {
            name: file,
            type: stats.isDirectory() ? 'directory' : 'file'
          };
        } catch (error) {
          return null;
        }
      })
    );
    const validItems = items.filter(item => item !== null);
    const directories = validItems
      .filter(item => item.type === 'directory')
      .sort((a, b) => a.name.localeCompare(b.name));
    const regularFiles = validItems
      .filter(item => item.type === 'file')
      .sort((a, b) => a.name.localeCompare(b.name));
    
    const sortedItems = [...directories, ...regularFiles];
    console.log('Name | Type');
    console.log('-----|-----');
    sortedItems.forEach(item => {
      console.log(`${item.name} | ${item.type}`);
    });
  } catch (error) {
    console.log('Operation failed');
  }
}

