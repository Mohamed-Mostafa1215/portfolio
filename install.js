const { execSync } = require('child_process');

try {
  console.log("Starting npm install...");
  const output = execSync('npm install primeng@19.0.5 @primeng/themes@19.0.5', { encoding: 'utf-8', stdio: 'pipe' });
  console.log("Success:", output);
} catch (error) {
  console.error("Installation failed!");
  console.error("Stdout:", error.stdout);
  console.error("Stderr:", error.stderr);
}
