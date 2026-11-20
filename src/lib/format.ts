export const formatDate = (value?: string): string | undefined => {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};
