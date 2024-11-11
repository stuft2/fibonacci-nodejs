# Fibonacci Web Server (Node.js)

## Installation

Before running the server, make sure to install the dependencies:

```shell
npm install
```

## Usage

Starting the server:

```shell
node main.js
```

## Benchmarking

This command:

- Uses 4 threads (-t4).
- Simulates 1000 concurrent connections (-c1000).
- Runs for 30 seconds (-d30s).

```shell
wrk -t4 -c1000 -d30s "http://localhost:8080/fibonacci?n=40"
```

#### Results with a 2021 MacBook Pro

- **Chip**: Apple M1 Pro
- **Memory**: 16 GB
- **macOS**: Sonoma 14.6.1

```shell
Running 30s test @ http://localhost:8080/fibonacci?n=40
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    28.63ms   44.26ms   1.10s    99.23%
    Req/Sec     9.73k   751.47    10.99k    93.67%
  1163437 requests in 30.05s, 247.07MB read
  Socket errors: connect 0, read 5000, write 9, timeout 0
Requests/sec:  38722.20
Transfer/sec:      8.22MB

```
