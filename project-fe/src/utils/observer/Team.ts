import { useDispatch } from 'react-redux'
import { Competition } from '../../model/Competition'
import { ObserverClass } from './Observer'
import { notify } from '../../redux/slice/studentReducer'

export class Team implements ObserverClass {
  dispatch = useDispatch()

  notificarTeam = () => {
    this.dispatch(notify())
  }
}
