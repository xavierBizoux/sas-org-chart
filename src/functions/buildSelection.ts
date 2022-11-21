import INode from "../interfaces/INode"

const buildSelection = (selectedNode: INode) => {
  const selection = new Set<number>([])
  // Function to identify the rows which should be passed to VA
  const selectChild = (nodes: INode[]) => {
    nodes.forEach(node => {
      selection.add(node.rowNum)
      if (node.children) {
        selectChild(node.children)
      }
    })
  }
  selectChild([selectedNode])
  return selection
}

export default buildSelection