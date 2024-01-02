export function generateId() {
  const randomPart = Math.random().toString(36).substr(2, 10);
  const timestampPart = new Date().getTime().toString(36).substr(-6);

  return randomPart + timestampPart;
}
