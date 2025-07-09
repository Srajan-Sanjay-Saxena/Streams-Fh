import fs from 'fs';

// Create a writable stream
const writeStream = fs.createWriteStream('./output.txt', { 
    flags: 'w',
    encoding: 'utf-8'
});

// Counter to track writes
let writeCount = 0;
const totalWrites = 1000000;

// Function to write data
function writeData() {
    let canWrite = true;
    
    while (writeCount < totalWrites && canWrite) {
        // Write data
        canWrite = writeStream.write('Some data to write\n', (err) => {
            if (err) {
                console.error('Error writing to stream:', err);
                return;
            }
        });
        
        writeCount++;
        
        // Log progress every 100000 writes
        if (writeCount % 100000 === 0) {
            console.log(`Progress: ${writeCount}/${totalWrites}`);
        }
    }
    
    // If we can't write anymore, wait for drain
    if (!canWrite) {
        writeStream.once('drain', () => {
            console.log('Drain event received, resuming writes...');
            writeData();
        });
    } else if (writeCount === totalWrites) {
        // If we've written everything, end the stream
        console.log('All data written, ending stream...');
        writeStream.end();
    }
}

// Handle stream events
writeStream.on('finish', () => {
    console.log('Stream finished!');
    console.log(`Total writes completed: ${writeCount}`);
});

writeStream.on('error', (err) => {
    console.error('Stream error:', err);
});

// Start writing
console.time('Writing Operation');
writeData();

// Log when the entire operation is complete
writeStream.on('finish', () => {
    console.timeEnd('Writing Operation');
});