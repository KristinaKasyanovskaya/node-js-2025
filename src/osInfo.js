import { EOL, cpus, homedir, userInfo, arch } from 'os';

export function getOSInfo(flag) {
  try {
    switch (flag) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
        break;
      
      case '--cpus':
        const cpuInfo = cpus();
        console.log(`Overall CPUs: ${cpuInfo.length}`);
        cpuInfo.forEach((cpu, index) => {
          const ghz = (cpu.speed / 1000).toFixed(2);
          console.log(`CPU ${index + 1}: Model: ${cpu.model}, Clock rate: ${ghz} GHz`);
        });
        break;
      
      case '--homedir':
        console.log(homedir());
        break;
      
      case '--username':
        console.log(userInfo().username);
        break;
      
      case '--architecture':
        console.log(arch());
        break;
      
      default:
        console.log('Invalid input');
    }
  } catch (error) {
    console.log('Operation failed');
  }
}

