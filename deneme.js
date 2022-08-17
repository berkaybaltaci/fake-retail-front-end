const map = new Map();
map.set('apple', 2);
map.set('pear', 4);
map.set('banana', 9);

let arr = [];

for (let [key, value] of map) {
  let temp = {};
  temp[key] = value;
  arr.push(temp);
}

let str = '[';
for (const [key, value] of Object.entries(arr[0])) {
  str += `{ ${key}: "${value}"}`;
}
str += ']';

console.log(str);
