const http = require("http");
const Piscina = require('piscina');
const path = require('path');
// Instantiate the worker pool with a fixed size
const pool = new Piscina({ filename: path.resolve(__dirname, 'fibonacci.js'), minThreads: 4, maxThreads: 4 }); // Pool of 4 workers

// HTTP server to handle requests
http.createServer(async (req, res) => {
	const start = Date.now();

	// Parse the "n" parameter from the URL
	const urlParams = new URL(req.url, `http://${req.headers.host}`);
	const n = parseInt(urlParams.searchParams.get("n")) || 40;

	try {
		// Calculate Fibonacci number using the worker pool
		const result = await pool.run(n);
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
