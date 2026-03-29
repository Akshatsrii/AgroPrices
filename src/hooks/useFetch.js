import { useEffect, useState } from 'react'

function useFetch(fn, param) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fn(param).then(res => {
      setData(res.data)
      setLoading(false)
    })
  }, [param])

  return { data, loading }
}

export default useFetch