export function shouldFail() {
  const random = Math.floor(Math.random() * 10) + 1;
  return random > 4;
}
