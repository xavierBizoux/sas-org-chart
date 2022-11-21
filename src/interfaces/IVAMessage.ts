import IVASelection from '../interfaces/IVASelection'

interface IVAMessage {
  resultName: string
  message?: string
  selections ?: IVASelection[]
}

export default IVAMessage