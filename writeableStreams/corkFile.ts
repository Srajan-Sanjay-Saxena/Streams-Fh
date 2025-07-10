import fs from 'fs';

const writeStream = fs.createWriteStream('./test.txt', {
    highWaterMark: 16384, // 16KB buffer
});

let i = 0;
const BATCH_SIZE = 5000; // Number of writes before uncorking
const TOTAL_ITERATIONS = 1000000000; // 1 billion iterations

// Function to write a batch of data
const writeBatch = () => {
    writeStream.cork(); // Buffer the data

    let batchCount = 0;
    while (i < TOTAL_ITERATIONS && batchCount < BATCH_SIZE) {
        writeStream.write(Buffer.from('hello my name is srajan', 'utf-8'));
        i++;
        batchCount++;

        if (i % 10000000 === 0) { // Log progress every 10 million writes
            console.log(`Progress: ${i} of ${TOTAL_ITERATIONS} (${((i/TOTAL_ITERATIONS)*100).toFixed(2)}%)`);
        }
    }

    // Schedule uncork on the next tick to allow buffering
    process.nextTick(() => {
        writeStream.uncork();
        
        // If there's more data to write, schedule the next batch
        if (i < TOTAL_ITERATIONS) {
            setImmediate(writeBatch);
        } else {
            // Close the stream when all writes are complete
            writeStream.end(() => {
                console.log('Writing completed and stream closed');
            });
        }
    });
};

// Error handling
writeStream.on('error', (err) => {
    console.error('Error writing to file:', err);
});

// Start timing
console.time('Writing Operation');

// Start the first batch
writeBatch();

// Log when everything is done
writeStream.on('finish', () => {
    console.timeEnd('Writing Operation');
    console.log('Total bytes written:', i * Buffer.from('hello my name is srajan', 'utf-8').length);
});