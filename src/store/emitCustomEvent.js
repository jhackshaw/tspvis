

export default (...args) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent(...args);
    window.dispatchEvent(event);
  }
}