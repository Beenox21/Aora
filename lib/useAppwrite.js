import {Alert} from 'react-native'
import { useEffect, useState } from 'react'

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        try {
            setLoading(true)
            const res = await fn()
            setData(res)
        } catch (error) {
            Alert.alert('Error while fetching data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    },[])

    const refetch = ()  => fetch()

    return {data, loading, refetch}
}

export default useAppwrite;