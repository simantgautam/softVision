export function isValidMobileNumber(mobileNumber) {
  const mobileNumberPattern = /^[0-9]{10}$/;
  return mobileNumberPattern.test(mobileNumber);
}
