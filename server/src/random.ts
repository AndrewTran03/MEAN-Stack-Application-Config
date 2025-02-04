function add(a: number, b: number) {
  return a + b;
}

function add2(a: number, b: number) {
  return a + b;
}

type User = {
  id: number;
  age: number;
};

const fn: (id: User["id"]) => User = (id) => {
  return { id, age: 2 };
};
fn(2);

export { add, add2 };
