export interface Item {
  id: string;
  text: string;
  completed: boolean;
}

export const calculateProgress = (items: Item[]): number => {
  if (items.length === 0) return 0;
  const completedCount = items.filter(item => item.completed).length;
  return Math.round((completedCount / items.length) * 100);
};