export const handleError = (val) => {
  if (val.errors) {
    return val.errors[Object.keys(val.errors)[0]][0];
  } else if (val.error) {
    return val.error;
  } else if (val.message) {
    return val.message;
  } else {
    return "An Error occured, contact support if this issue persists";
  }
};
