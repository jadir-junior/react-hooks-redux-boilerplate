const email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function goodPassword(password) {
  //a custom validator!
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

function sameAs(repeatPassword, password) {
  return repeatPassword === password ? true : false;
}

export const validation = {
  email,
  goodPassword,
  sameAs,
};
