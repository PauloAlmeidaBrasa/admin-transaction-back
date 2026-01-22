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

const idUserAliases = [
  'cpf',      // Brazil
  'ssn',      // USA
  'dni',      // Spain
  'nin',      // UK
  'id_user'   // fallback / generic
];


const resolveIdUser = (row) => {
  for (const alias of idUserAliases) {
    if (row[alias]) {
      return row[alias];
    }
  }
  return null;
}

module.exports = {
  parseEmail,
  isEmpty,
  resolveIdUser
};