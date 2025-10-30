async function doEncrypt(password, email) {
  const FIXED_SALT = "kash12.';[]78()a;1%$<>";
  const halfEmail = email.slice(0, Math.floor(email.length / 2));
  const reversedEmail = email.split("").reverse().join("");

  const combined = `${reversedEmail}${password}${FIXED_SALT}${halfEmail}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(combined);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  return hashHex;
}

module.exports = doEncrypt;
