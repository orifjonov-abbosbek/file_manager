import fs from "fs";
import path from "path";
import readline from "readline";
import os from "os";
import crypto from 'node:crypto'
import zlib from "node:zlib";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentDirectory = os.homedir(); 

const printCurrentDirectory = () => {
  console.log(`You are currently in directory: ${currentDirectory}`);
};

const goToUpperDirectory = () => {
  const parentDirectory = path.dirname(currentDirectory);
  if (currentDirectory === parentDirectory) {
    console.log("Cannot go upper than the root directory.");
  } else {
    currentDirectory = parentDirectory;
    printCurrentDirectory();
  }
};

const changeDirectory = (directoryPath) => {
  const absolutePath = path.resolve(currentDirectory, directoryPath);
  if (!fs.existsSync(absolutePath)) {
    console.log("Invalid directory path.");
    return;
  }
  if (!fs.statSync(absolutePath).isDirectory()) {
    console.log("The specified path is not a directory.");
    return;
  }
  currentDirectory = absolutePath;
  printCurrentDirectory();
};

// List files and folders in the current directory
const listDirectoryContents = () => {
  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.log("Operation failed:", err);
      return;
    }

    const fileData = files.map((file, index) => {
      const filePath = path.join(currentDirectory, file);
      const stats = fs.statSync(filePath);
      const type = stats.isDirectory() ? "Folder" : "File";
      const fileName = stats.isDirectory() ? file + "/" : file;

      return {
        "File Name": fileName,
        Type: type,
      };
    });

    console.table(fileData, ["File Name", "Type"]);
  });
};



// Read file and print its content
const readFile = (filePath) => {
  const absolutePath = path.resolve(currentDirectory, filePath);
  fs.readFile(absolutePath, "utf8", (err, data) => {
    if (err) {
      console.log("Operation failed:", err);
      return;
    }
    console.log(data);
  });
};

// Create empty file
const createFile = (fileName) => {
  const absolutePath = path.resolve(currentDirectory, fileName);
  fs.writeFile(absolutePath, "", (err) => {
    if (err) {
      console.log("Operation failed:", err);
      return;
    }
    console.log("File created successfully!");
  });
};

// Rename file
const renameFile = (filePath, newFileName) => {
  const absoluteFilePath = path.resolve(currentDirectory, filePath);
  const fileDirectory = path.dirname(absoluteFilePath);
  const newFilePath = path.join(fileDirectory, newFileName);

  fs.rename(absoluteFilePath, newFilePath, (err) => {
    if (err) {
      console.log("Operation failed:", err);
      return;
    }
    console.log("File renamed successfully!");
  });
};


// Copy file
const copyFile = (source, destination) => {
  const absoluteSourcePath = path.resolve(currentDirectory, source);
  const absoluteDestinationPath = path.resolve(currentDirectory, destination);

  const sourceStream = fs.createReadStream(absoluteSourcePath);
  const destinationStream = fs.createWriteStream(absoluteDestinationPath);

  sourceStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  destinationStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  destinationStream.on("finish", () => {
    console.log("File copied successfully!");
  });

  sourceStream.pipe(destinationStream);
};

// Move file
const moveFile = (source, destination) => {
  const absoluteSourcePath = path.resolve(currentDirectory, source);
  const fileName = path.basename(absoluteSourcePath);
  const absoluteDestinationPath = path.resolve(
    currentDirectory,
    destination,
    fileName
  );

  const sourceStream = fs.createReadStream(absoluteSourcePath);
  const destinationStream = fs.createWriteStream(absoluteDestinationPath);

  sourceStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  destinationStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  destinationStream.on("finish", () => {
    fs.unlink(absoluteSourcePath, (err) => {
      if (err) {
        console.log("Operation failed:", err);
        return;
      }
      console.log("File moved successfully!");
    });
  });

  sourceStream.pipe(destinationStream);
};


// Delete file
const deleteFile = (filePath) => {
  const absolutePath = path.resolve(currentDirectory, filePath);
  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.log("Operation failed:", err);
      return;
    }
    console.log("File deleted successfully!");
  });
};

// Get End-Of-Line (EOL) for the system
const getEOL = () => {
  console.log(`System End-Of-Line (EOL): ${os.EOL}`);
};

// Get CPU information
const getCPUsInfo = () => {
  const cpus = os.cpus();
  console.log(`Number of CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Clock rate: ${cpu.speed / 1000} GHz`);
  });
};

// Get home directory
const getHomeDirectory = () => {
  console.log(`Home Directory: ${os.homedir()}`);
};

// Get current system user name
const getUsername = () => {
  console.log(`Current System User Name: ${os.userInfo().username}`);
};

// Get CPU architecture for which Node.js binary has compiled
const getArchitecture = () => {
  console.log(`Node.js Binary CPU Architecture: ${process.arch}`);
};

// Calculate hash for file
const calculateHash = (filePath) => {
  const absolutePath = path.resolve(currentDirectory, filePath);
  const hash = crypto.createHash("sha256");
  const input = fs.createReadStream(absolutePath);

  input.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  input.on("data", (chunk) => {
    hash.update(chunk);
  });

  input.on("end", () => {
    console.log("Hash:", hash.digest("hex"));
  });
};

// Compress file using Brotli algorithm

const compressFile = (filePath, destinationDirectory) => {
  const absoluteSourcePath = path.resolve(currentDirectory, filePath);
  const sourceFileName = path.basename(absoluteSourcePath);
  const compressedFileName = sourceFileName + ".br";
  const absoluteDestinationPath = path.resolve(
    currentDirectory,
    destinationDirectory,
    compressedFileName
  );

  const sourceStream = fs.createReadStream(absoluteSourcePath);
  const destinationStream = fs.createWriteStream(absoluteDestinationPath);
  const compressionOptions = { level: 6, chunkSize: 64 * 1024 };

  const compress = zlib.createBrotliCompress(compressionOptions);

  sourceStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  destinationStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  destinationStream.on("finish", () => {
    console.log("File compressed successfully!");
  });

  sourceStream.pipe(compress).pipe(destinationStream);
};


// Decompress file using Brotli algorithm
const decompressFile = (compressedFilePath, destinationDirectory) => {
  const absoluteCompressedPath = path.resolve(
    currentDirectory,
    compressedFilePath
  );
  const compressedFileName = path.basename(absoluteCompressedPath);
  const decompressedFileName = compressedFileName.replace(".br", "");
  const absoluteDestinationPath = path.resolve(
    currentDirectory,
    destinationDirectory,
    decompressedFileName
  );

  const compressedStream = fs.createReadStream(absoluteCompressedPath);
  const decompressedStream = fs.createWriteStream(absoluteDestinationPath);
  const decompressionOptions = { chunkSize: 64 * 1024 };

  const decompress = zlib.createBrotliDecompress(decompressionOptions);

  compressedStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  decompressedStream.on("error", (err) => {
    console.log("Operation failed:", err);
  });

  decompressedStream.on("finish", () => {
    console.log("File decompressed successfully!");
  });

  compressedStream.pipe(decompress).pipe(decompressedStream);
};

const startProgram = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();

  rl.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");

    switch (command) {
      case "up":
        goToUpperDirectory();
        break;
      case "cd":
        changeDirectory(args[0]);
        break;
      case "ls":
        listDirectoryContents();
        break;
      case "cat":
        readFile(args[0]);
        break;
      case "add":
        createFile(args[0]);
        break;
      case "rn":
        renameFile(args[0], args[1]);
        break;
      case "cp":
        copyFile(args[0], args[1]);
        break;
      case "mv":
        moveFile(args[0], args[1]);
        break;
      case "rm":
        deleteFile(args[0]);
        break;
      case "os":
        if (args[0] === "--EOL") {
          getEOL();
        } else if (args[0] === "--cpus") {
          getCPUsInfo();
        } else if (args[0] === "--homedir") {
          getHomeDirectory();
        } else if (args[0] === "--username") {
          getUsername();
        } else if (args[0] === "--architecture") {
          getArchitecture();
        } else {
          console.log("Invalid input.");
        }
        break;
      case "hash":
        calculateHash(args[0]);
        break;
      case "compress":
        compressFile(args[0], args[1]);
        break;
      case "decompress":
        decompressFile(args[0], args[1]);
        break;
      default:
        console.log("Invalid input.");
        break;
    }
  });

  rl.on("close", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
};

const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Username';


process.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});


rl.on("line", (input) => {
  if (input === ".exit") {
    console.log("Exiting program...");
    rl.close();
    process.exit(); 
  } else {
  }
});



if (!username) {
  console.log(
    "Username argument not provided. Usage: npm run start -- --username=your_username"
  );
} else {
  startProgram(username);
}
