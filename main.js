// app.js
const http = require("http");
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

// Fibonacci function to calculate nth Fibonacci number in a separate thread
function fibonacci(n) {
	if (n <= 1) return n;
	let a = 0, b = 1;
	for (let i = 2; i <= n; i++) {
		[a, b] = [b, a + b];
	}
	return b;
}

// Create a worker for CPU-bound calculations
function calculateFibonacci(n) {
	return new Promise((resolve, reject) => {
		const worker = new Worker(__filename, { workerData: n });
		worker.on("message", resolve);
		worker.on("error", reject);
		worker.on("exit", (code) => {
			if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
		});
	});
}

// Worker thread execution
if (!isMainThread) {
	const result = fibonacci(workerData);
	parentPort.postMessage(result);
} else {
	// Main thread - set up HTTP server
	http.createServer(async (req, res) => {
		const start = Date.now();

		// Parse "n" parameter from the URL
		const urlParams = new URL(req.url, `http://${req.headers.host}`);
		const n = parseInt(urlParams.searchParams.get("n")) || 40;

		try {
			// Calculate Fibonacci number in a worker thread
			const result = await calculateFibonacci(n);
			const elapsed = Date.now() - start;

			// Prepare and send the JSON response
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ number: n, result, elapsed: `${elapsed}ms` }));
		} catch (error) {
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: error.message }));
		}
	}).listen(8080, () => {
		console.log("Node.js server running on http://localhost:8080");
	});
}
