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

#### Results with a 2021 MacBook Pro
- **Chip**: Apple M1 Pro
- **Memory**: 16 GB
- **macOS**: Sonoma 14.6.1

```shell
Running 30s test @ http://localhost:8080/fibonacci?n=40
  4 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   839.14ms    0.00us 839.14ms  100.00%
    Req/Sec    27.70     18.96   151.00     77.34%
  2711 requests in 30.08s, 596.16KB read
  Socket errors: connect 0, read 4479, write 1307, timeout 2710
Requests/sec:     90.13
Transfer/sec:     19.82KB

```
