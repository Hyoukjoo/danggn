export function getCategoryName(categoryNumber: number): string {
  switch (categoryNumber) {
    case 0:
      return '차량';
    case 5:
      return '부동산';
    default:
      return '';
  }
}