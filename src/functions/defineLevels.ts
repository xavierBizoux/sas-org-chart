import IVAData from "../interfaces/IVAData"
import sendMessageToVA from "./sendMessageToVA"

 // Function to define the number of levels in the tree
 const defineLevels = (data: IVAData) => {
  // Initialize the number of levels
  let levels: number = 0
  // Check columns are categorical and define the number of levels in the tree
  data.columns.every((col, idx) => {
    if (col.type === "string") {
      levels++
      return true
    } else {
      if (col.label !== undefined) {
        // Send information to user that only categorical variables are supported
        sendMessageToVA({resultName: data.resultName, message: "Only categorical variables are supported!"})
      }
      return false
    }
  })
  return levels
   }

export default defineLevels