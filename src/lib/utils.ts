export function formatDateTime(date: string) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } as const;

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}
