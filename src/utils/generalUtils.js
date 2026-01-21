const parseEmail = (email) => {
  if (!email || typeof email !== 'string') return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
};

module.exports = {
  parseEmail,
  isEmpty
};