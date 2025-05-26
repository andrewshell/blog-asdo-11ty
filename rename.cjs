const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const essaysDir = './content/essays';

// Get all markdown files in the essays directory
const files = fs.readdirSync(essaysDir).filter(file => 
  file.endsWith('.md') && !file.match(/^\d{8}-/)
);

console.log(`Found ${files.length} files to rename:`);

files.forEach(filename => {
  const filepath = path.join(essaysDir, filename);
  
  try {
    // Read and parse the frontmatter
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const { data } = matter(fileContent);
    
    if (!data.date) {
      console.log(`⚠️  Skipping ${filename} - no date field found`);
      return;
    }
    
    // Format date as YYYYMMDD
    const date = new Date(data.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const datePrefix = `${year}${month}${day}`;
    
    // Create new filename
    const newFilename = `${datePrefix}-${filename}`;
    const newFilepath = path.join(essaysDir, newFilename);
    
    // Check if new filename already exists
    if (fs.existsSync(newFilepath)) {
      console.log(`⚠️  Skipping ${filename} - ${newFilename} already exists`);
      return;
    }
    
    // Rename the file
    fs.renameSync(filepath, newFilepath);
    console.log(`✅ Renamed: ${filename} → ${newFilename}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log('\nRenaming complete!');