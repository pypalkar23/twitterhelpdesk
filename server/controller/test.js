const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
const validUsernameRegex = /^[A-Za-z]{1,}[A-Za-z0-9]{4,}/;
console.log(regex.test("mandar.palkar23@gmail.com"));
console.log(regex.test("mandar.palkar23gmail.com"));
console.log(validPasswordRegex.test("ABC*90yzl"));
console.log(validPasswordRegex.test("ABC"));
console.log(validUsernameRegex.test("ABC*90yzl"));
console.log(validUsernameRegex.test("ABCDE"));
