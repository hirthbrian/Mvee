export const MAX_HEADER_HEIGHT = 300;

export const getTitleAndYear = (title, year) => {
  return year ? `${title} (${year})` : title
}
