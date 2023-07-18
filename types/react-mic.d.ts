import * as ReactMic from 'react-mic'

// fix react-mic type
declare module 'react-mic' {
  export interface IReactMicStopEvent extends Omit<ReactMic.ReactMicStopEvent, 'blobURL'> {
    options: ReactMicStopEvent['option']
    blobURL?: string
  }
}
