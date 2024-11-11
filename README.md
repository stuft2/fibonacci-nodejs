# Fibonacci Web Server (Node.js)

## Usage

```shell
node main.js
```

## Benchmarking

This command:

- Uses 4 threads (-t4).
- Simulates 1000 concurrent connections (-c1000).
- Runs for 30 seconds (-d30s).

```shell
wrk -t4 -c1000 -d30s http://localhost:8080/fibonacci?n=40
```
