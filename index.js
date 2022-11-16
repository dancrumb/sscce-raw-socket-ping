const { ping } = require("./ping");
const raw = require("raw-socket");

/**
 *
 * @param {Buffer} message
 */
function onMessage(message) {
  console.log(`------`);
  const ip = message.subarray(0x00, 0x14);
  const ipVersion = (ip[0] & 0xf0) >> 4;
  const totalLength = ip.subarray(0x02, 0x04).readInt16BE();
  const hChecksum = ip.subarray(0x0a, 0x0c);
  console.log(`IP Header: ${ip.toString("hex")}`);
  console.log(`  Version: ${ipVersion}`);
  console.log(`   Length: ${totalLength} (should be ~60)`);
  console.log(` Checksum: ${hChecksum.toString("hex")}`);
  const calculatedChecksum = raw.createChecksum(ip).toString(16);
  console.log(
    `  Checked: ${calculatedChecksum} (should be 0 for valid checksum)`
  );

  const icmp = message.subarray(0x15);
  console.log(`\nICMP body: ${icmp.toString("hex")}`);
  console.log(`------\n`);
}

console.log("Sending...");
ping("8.8.8.8", onMessage);
console.log(`.........................\n`);
