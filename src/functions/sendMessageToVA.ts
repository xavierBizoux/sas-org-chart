import IVAMessage from "../interfaces/IVAMessage"

const sendMessageToVA = (message:IVAMessage) => {
  // Send the message to VA
  const url = window.location !== window.parent.location ? document.referrer : document.location.href
  window.parent.postMessage(message, url)
}

export default sendMessageToVA
