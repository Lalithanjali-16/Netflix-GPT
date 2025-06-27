export const checkValidateData = (email, password, fullname = null) => {
  const isValidEmail = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isValidPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  const isValidFullname = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/.test(fullname);

  if (!isValidEmail) return "Email ID is not valid";
  if (!isValidPassword) return "Password is not valid";
  if (fullname !== null && !isValidFullname) return "Enter full name (first and last)";
  
  return null;
};
