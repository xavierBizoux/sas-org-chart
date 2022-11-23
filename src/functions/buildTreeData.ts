import INode from "../interfaces/INode"
import IVAData from "../interfaces/IVAData"
import defineLevels from "./defineLevels"

// Function to build the tree from array data
const buildTreeData = (vaData: IVAData) => {
  const data: INode[] = []
  let lastId: number = 0
  // Check unique root element
  const roots: string[] = []
  vaData.data.forEach(el => {
    if (!roots.includes(el[0])) {
      roots.push(el[0])
    }
  })
  // Add a fake root element if data has more than one root element
  if (roots.length > 1) {
    vaData.data.forEach(el => el.unshift("Root"))
    vaData.columns.unshift({name: "root", label:"root", type:"string"})
  }
  // Define the number of levels in the tree
  const levels = defineLevels(vaData)
  // Transform the data from VA
  vaData.data.forEach((el, idx) => {
    for (let i = 0; i < levels; i++) {
      const path: string[] = []
      for (let j = 0; j <= i - 1; j++) {
        path.push(el[j])
      }
      const parent = data.find(node => node.path?.concat(node.name).toString() === path.toString())
      const node: INode = {
        "id": lastId + 1,
        "name": el[i],
        "parentId": parent?.id || 0,
        "rowNum": idx,
        "level": i,
        "path": path,
        "children": []
      }
      if (!data.find(el => node.name === el.name && node.parentId === el.parentId)) {
        data.push(node)
        lastId++
      }
    }
  })
  // Add children to each node
  data.forEach(node => {
    node.children = data.filter(el => node.id === el.parentId).sort((a, b) => a.name < b.name ? -1 : 1)
  })
  console.log(data)
  return data
}

export default buildTreeData