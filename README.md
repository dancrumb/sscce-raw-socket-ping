# SSCCE for raw-socket issue #60

This is a Short, Self-Contained Correct Example for https://github.com/nospaceships/node-raw-socket/issues/60

To run it, simply do:

```
npm install
node run index.js
```

When run locally, I get the following output:

```
Sending...
.........................

sent 40 bytes to 8.8.8.8
received 60 bytes from 8.8.8.8
------
IP Header: 452028000000000074011fa908080808c0a85640
  Version: 4
   Length: 10240 (should be ~60)
 Checksum: 1fa9
  Checked: d83b (should be 0 for valid checksum)

ICMP body: 004b5200010a096162636465666768696a6b6c6d6e6f7071727374757677616263646566676869
------
```

I would expect to get

```
Sending...
.........................

sent 40 bytes to 8.8.8.8
received 60 bytes from 8.8.8.8
------
IP Header: 4520003c0000000074011fa908080808c0a85640
  Version: 4
   Length: 60 (should be ~60)
 Checksum: 1fa9
  Checked: 0 (should be 0 for valid checksum)

ICMP body: 004b5200010a096162636465666768696a6b6c6d6e6f7071727374757677616263646566676869
------
```