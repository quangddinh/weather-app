import { defineStore } from 'pinia'

// List of country code uses Fahrenheit temperature
const fahrenheitList = ['US', 'BZ', 'VG', 'FM', 'MH', 'MS', 'KN', 'BS', 'CY', 'TC', 'LR', 'PW']

export const useMainStore = defineStore('main', {
  state: (): IState => {
    return { browserLocation: '', _apiKey: '' }
  },
  getters: {
    isUsedFahrenheit: (state: IState) => fahrenheitList.includes(state.browserLocation),
    apiKey: (state: IState) => state._apiKey
  },
  actions: {
    setBrowserLocation(payload: string) {
      this.browserLocation = payload
    },
    setApiKey(payload: string) {
        this._apiKey = payload
    }
  }
})

interface IState {
  browserLocation: string
  _apiKey: string
}
