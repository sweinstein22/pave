export const mapEmploymentType = (type) => {
  type = type.toLowerCase().replace(/\s/g, '');
  switch (type) {
    case 'fulltime':
      return 'Full Time';
    case 'parttime':
      return 'Part Time';
    case 'contractor':
      return 'Contractor';
    default:
      return 'Uncategorized';
  }
};

export const safeArrayInsertAtLevel = ({arr, index, level, val}) => {
  if (!arr[index]) arr[index] = new Array(level - 1).fill(null)
  let len = arr[index].length;
  if (len < level - 1) arr[index] = arr[index].concat(new Array(level - len - 1).fill(null))
  arr[index] = [...arr[index], val]
};

export const safeObjectAppendToArray = (obj, path, value) => {
  const elements = path.split('.');
  elements.forEach((element, i) => {
    if (i < elements.length - 1) {
      obj[element] = obj[element] || {};
      obj = obj[element];
    }
    else obj[element] = [...obj[element] || [], value];
  });
};

export const safeObjectGet = (obj, path) => {
  return path.split('.').reduce((memo, element) => memo && memo[element], obj)
}
