import { stdin, stdout, exit } from 'process';
import { createInterface } from 'readline';
import { homedir } from 'os';
import { resolve } from 'path';
import { handleCommand } from './src/commandHandler.js';
import { printCurrentDirectory } from './src/utils.js';

const args = process.argv.slice(2);
let username = 'User';

for (const arg of args) {
  if (arg.startsWith('--username=')) {
    username = arg.split('=')[1];
    break;
  }
}

let currentDirectory = homedir();

console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory(currentDirectory);

const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: ''
});

rl.on('line', async (input) => {
  const command = input.trim();
  
  if (command === '.exit') {
    rl.close();
    return;
  }
  
  if (!command) {
    printCurrentDirectory(currentDirectory);
    rl.prompt();
    return;
  }
  
  try {
    const result = await handleCommand(command, currentDirectory);
    if (result.newDirectory) {
      currentDirectory = result.newDirectory;
    }
  } catch (error) {
  }
  
  printCurrentDirectory(currentDirectory);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  exit(0);
});

process.on('SIGINT', () => {
  rl.close();
});

rl.prompt();

