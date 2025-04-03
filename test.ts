const result = await fetch("https://jsr.io/@coldiron/netherite/meta.json");
const data = await result.json();
console.log(data);