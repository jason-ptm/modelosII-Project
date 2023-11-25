import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { redirectRoute } from '../../redux/slice/studentReducer'

const RedirectComponent: FC<any> = () => {
  const { urlToRedirect } = useSelector((state: RootState) => state.student)
  const location = useLocation()
  const dispatch = useDispatch()

  const [url, setUrl] = useState(urlToRedirect)

  useEffect(() => {
    if (url !== location.pathname) setUrl(urlToRedirect)
    else dispatch(redirectRoute(''))
  }, [urlToRedirect])

  return url ? <Navigate to={url} /> : <></>
}

export default RedirectComponent
