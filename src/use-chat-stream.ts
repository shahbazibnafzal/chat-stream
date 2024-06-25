import { useState } from "react"

const useChatStream = (url: string) => {
  const [data, setData] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  const startStreaming = () => {
    const eventSource = new EventSource(url)

    eventSource.onmessage = (event) => {
      const newEvent = JSON.parse(event.data)
      if (newEvent.message === 'Stream completed') {
        eventSource.close()
      } else {
        setData((prevData) => [...prevData, newEvent.message])
      }
    }

    eventSource.onerror = (err) => {
      setError('Failed to fetch data stream.')
      eventSource.close()
    }
  }

  return { data, error, startStreaming}
}

export default useChatStream