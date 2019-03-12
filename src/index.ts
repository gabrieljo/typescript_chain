const person = (name: string, age: number, gender: string): string => {
  return `Hello ${name}, you are ${age}, you are a ${gender}`;
};

const result = person("Gabriel", 38, "male");
console.log(result);
