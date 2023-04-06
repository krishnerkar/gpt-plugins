export default function debounce(
  fn: (...args: any[]) => void,
  delay: number
): (...args: any[]) => void {
  let timeoutId: NodeJS.Timeout | null;
  return function (...args: any[]): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
