export const getRecipientFromURL = () => {
  const query = new URLSearchParams(window.location.search)
  return query.get("rid")
}
