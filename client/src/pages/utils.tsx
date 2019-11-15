export function getCategoryName(categoryNumber: number): string {
  switch (categoryNumber) {
    case 0:
      return '인기매물';
    case 1:
      return '차량';
    case 2:
      return '가구/인테리어';
    case 3:
      return '유아동/유아도서';
    case 4:
      return '생활/가공식품';
    case 5:
      return '부동산';
    default:
      return '';
  }
}
