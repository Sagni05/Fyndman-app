function special(str) {
  // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return str.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).map((wo) => {
    return { word: wo, value: 0 };
  });
}
export { special };
