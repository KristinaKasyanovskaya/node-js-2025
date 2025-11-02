# File Manager

A CLI-based File Manager built with Node.js APIs without external dependencies.

## Requirements

- Node.js version 24.14.0 or higher
- No external dependencies required

## Installation & Usage

Start the File Manager:

```bash
npm run start -- --username=your_username
```

Example:
```bash
npm run start -- --username=Alice
```

## Available Commands

### Navigation & Working Directory
- `up` - Go to parent directory
- `cd path_to_directory` - Change directory (relative or absolute path)
- `ls` - List all files and folders in current directory

### File Operations
- `cat path_to_file` - Read file and print content
- `add new_file_name` - Create empty file
- `mkdir new_directory_name` - Create new directory
- `rn path_to_file new_filename` - Rename file
- `cp path_to_file path_to_new_directory` - Copy file
- `mv path_to_file path_to_new_directory` - Move file
- `rm path_to_file` - Delete file

### Operating System Info
- `os --EOL` - Display End-Of-Line character
- `os --cpus` - Display CPU info (count, model, clock rate in GHz)
- `os --homedir` - Display home directory path
- `os --username` - Display system user name
- `os --architecture` - Display CPU architecture

### Hash Calculation
- `hash path_to_file` - Calculate and display SHA-256 hash

### Compression
- `compress path_to_file path_to_destination` - Compress file using Brotli
- `decompress path_to_file path_to_destination` - Decompress file using Brotli

### Exit
- `.exit` - Exit the File Manager
- `Ctrl+C` - Exit the File Manager

---

## Self-Check: Scoring Criteria

### Basic Scope

#### General
- ✅ **+6** Application accepts username and prints proper message
  - Implemented in `index.js` - parses `--username` argument and displays welcome message
- ✅ **+10** Application exits if user pressed `ctrl+c` or sent `.exit` command and proper message is printed
  - Implemented in `index.js` - handles both `.exit` command and SIGINT (Ctrl+C)

#### Operations Fail
- ✅ **+20** Attempts to perform an operation on a non-existent file or work on a non-existent path result in the operation fail
  - All operations have try-catch blocks that print "Operation failed"
- ✅ **+10** Operation fail doesn't crash application
  - Error handling in `commandHandler.js` and all operation modules prevents crashes

#### Navigation & Working Directory Operations
- ✅ **+10** Go upper from current directory
  - Implemented `up` command in `navigation.js` with root directory protection
- ✅ **+10** Go to dedicated folder from current directory
  - Implemented `cd` command in `navigation.js` with path validation
- ✅ **+20** List all files and folders in current directory
  - Implemented `ls` command in `navigation.js` with sorting (folders first, alphabetical)

#### Basic Operations with Files
- ✅ **+10** Read file and print it's content in console
  - Implemented `cat` command in `fileOperations.js` using **Readable stream**
- ✅ **+5** Create empty file
  - Implemented `add` command in `fileOperations.js`
- ✅ **+5** Create new directory
  - Implemented `mkdir` command in `fileOperations.js`
- ✅ **+10** Rename file
  - Implemented `rn` command in `fileOperations.js`
- ✅ **+10** Copy file
  - Implemented `cp` command in `fileOperations.js` using **Readable and Writable streams**
- ✅ **+10** Move file
  - Implemented `mv` command in `fileOperations.js` using **streams** + delete original
- ✅ **+10** Delete file
  - Implemented `rm` command in `fileOperations.js`

#### Operating System Info
- ✅ **+6** Get EOL (default system End-Of-Line)
  - Implemented `os --EOL` in `osInfo.js`
- ✅ **+10** Get host machine CPUs info (overall amount + model + clock rate in GHz)
  - Implemented `os --cpus` in `osInfo.js` with proper formatting
- ✅ **+6** Get home directory
  - Implemented `os --homedir` in `osInfo.js`
- ✅ **+6** Get current system user name
  - Implemented `os --username` in `osInfo.js`
- ✅ **+6** Get CPU architecture for which Node.js binary has compiled
  - Implemented `os --architecture` in `osInfo.js`

#### Hash Calculation
- ✅ **+20** Calculate hash for file
  - Implemented `hash` command in `hash.js` using SHA-256

#### Compress and Decompress Operations
- ✅ **+20** Compress file (using Brotli algorithm)
  - Implemented `compress` command in `compression.js` using **Streams API**
- ✅ **+20** Decompress file (using Brotli algorithm)
  - Implemented `decompress` command in `compression.js` using **Streams API**

**Basic Scope Total: 230 points** ✅

---

### Advanced Scope

- ✅ **+30** All operations marked as to be implemented using certain streams should be performed using Streams API
  - `cat` - uses `createReadStream`
  - `cp` - uses `createReadStream`, `createWriteStream`, and `pipeline`
  - `mv` - uses streams via `copyFile` function
  - `compress` - uses `createReadStream`, `createBrotliCompress`, `createWriteStream`, and `pipeline`
  - `decompress` - uses `createReadStream`, `createBrotliDecompress`, `createWriteStream`, and `pipeline`

- ✅ **+20** No synchronous Node.js API with asynchronous analogues is used
  - All file operations use async APIs: `fs/promises` or callback-based streams
  - No `*Sync` methods used anywhere in the codebase

- ✅ **+20** Codebase is written in ESM modules instead of CommonJS
  - `package.json` contains `"type": "module"`
  - All imports use `import`/`export` syntax

- ✅ **+20** Codebase is separated (at least 7 modules)
  - 8 modules total:
    1. `index.js` - main entry point
    2. `src/commandHandler.js` - command routing
    3. `src/navigation.js` - navigation commands
    4. `src/fileOperations.js` - file operations
    5. `src/osInfo.js` - OS information
    6. `src/hash.js` - hash calculation
    7. `src/compression.js` - compression/decompression
    8. `src/utils.js` - utility functions

**Advanced Scope Total: 90 points** ✅

---

### Forfeits

- ✅ **No external tools/libraries used** - only Node.js built-in modules
  - No dependencies in `package.json`
  - Only native modules: `fs`, `path`, `os`, `crypto`, `zlib`, `stream`, `readline`, `process`

- ✅ **No commits after deadline** (affecting code)
  - This README is documentation only

---

## **Total Score: 320/320 points** ✅

---

## Technical Implementation Details

### Project Structure
```
node-js-2025/
├── index.js              # Main entry point, CLI setup, readline interface
├── package.json          # Project config with "type": "module"
└── src/
    ├── commandHandler.js # Routes commands to appropriate handlers
    ├── navigation.js     # up, cd, ls commands
    ├── fileOperations.js # cat, add, mkdir, rn, cp, mv, rm
    ├── osInfo.js         # os --* commands
    ├── hash.js           # hash command
    ├── compression.js    # compress, decompress commands
    └── utils.js          # Helper functions
```

### Key Features
- ✅ Starts in user's home directory
- ✅ Shows current working directory after each operation
- ✅ Cannot navigate above root directory
- ✅ Proper error handling without crashes
- ✅ Stream-based file operations for efficiency
- ✅ Full ESM modules support
- ✅ No external dependencies

### Error Messages
- `Invalid input` - for invalid commands or missing arguments
- `Operation failed` - for failed operations (non-existent files, permission errors, etc.)

