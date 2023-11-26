import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { redirectRoute } from '../../redux/slice/studentReducer'
import { RootState } from '../../redux/store'

const RedirectComponent: FC<any> = () => {
  const { urlToRedirect } = useSelector((state: RootState) => state.student)
  const location = useLocation()
  const dispatch = useDispatch()

  const [url, setUrl] = useState('')

  useEffect(() => {
    if (
      urlToRedirect.url !== location.pathname
    )
      setUrl(urlToRedirect.url)
    else
      dispatch(
        redirectRoute({
          url: '',
          isCreated: false,
        })
      )
  }, [urlToRedirect.url])

  return url.trim().length > 0 ? <Navigate to={url} /> : <></>
}

export default RedirectComponent
