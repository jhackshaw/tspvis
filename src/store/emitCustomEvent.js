

export default ev => {
  if (typeof window !== "undefined" && window.dataLayer) {
    console.log(ev)
    window.dataLayer.push(ev);
  } else {
    console.log(ev)
  }
}
