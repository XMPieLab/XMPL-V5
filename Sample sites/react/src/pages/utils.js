import { useEffect, useState }  from 'react'

export const useXmpl =  () => {
  return useEffect(() => {
    window.xmpProvider.bind(document.body).render()
  })
}

export const useRecipientID = () => {
  const [recipientID, setRecipientID] = useState(null)
  useEffect(() => {
    const getRecipientId = () => {
      if (window.xmpProvider.store.xmp.recipientID) {
        setRecipientID(window.xmpProvider.store.xmp.recipientID)
      }
    }
    window.xmpProvider.store.subscribe(getRecipientId)

    return () => {
      window.xmpProvider.store.unsubscribe(getRecipientId)
    }
  }, [recipientID])
  return [recipientID]
}

export const getRecipientFromURL = () => {
  const query = new URLSearchParams(window.location.search)
  return query.get("rid")
}