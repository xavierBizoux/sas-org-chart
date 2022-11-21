interface INode {
  id: number
  name: string
  parentId: number
  rowNum: number
  level: number
  path?: string[]
  children?: INode[]
}

export default INode