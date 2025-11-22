import { Webhook } from "svix";

// Read secret from command line
const secret = process.argv[2];

if (!secret) {
  console.error("❌ Missing webhook secret");
  process.exit(1);
}

const payload = {
  id: "msg_12345",
  type: "user.created",
  data: {
    object: {
      id: "user_test_123",
      primary_email_address: "localtest@example.com",
      first_name: "Local",
      last_name: "TestUser",
    },
  },
};

console.log("DEBUG payload =", payload);

const body = JSON.stringify(payload);

// SIGN using Svix
const wh = new Webhook(secret);
const headers = wh.sign(body);

console.log("DEBUG signed headers =", headers);

// SEND TO WEBHOOK ENDPOINT (using native fetch — Node 20+)
const res = await fetch("http://localhost:5000/api/webhooks/clerk", {
  method: "POST",
  headers: {
    ...headers,
    "content-type": "application/json",
  },
  body,
});

console.log("🔎 Status:", res.status);
console.log("🔎 Response:", await res.text());
