export default ev => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(ev);
  } else {
    console.log(ev);
  }
};
