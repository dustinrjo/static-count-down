var messages, randomMessage;

messages = ["Hello World", "こんにちは世界"];

randomMessage = messages[Math.floor(Math.random() * messages.length)];

console.log(randomMessage);
