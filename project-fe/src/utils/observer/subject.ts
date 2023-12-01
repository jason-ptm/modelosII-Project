import { Competition } from '../../model/Competition'
import { ObserverClass } from './Observer'

export class Subject {
  observers: ObserverClass[] = []

  addObserver = (observer: ObserverClass) => {
    this.observers.push(observer)
  }

  notifyObservers = () => {
    this.observers.map((observer) => {
      observer.notificarTeam()
    })
  }
}
