interface IVAData {
  availableRowCounts: number
  columns: [{ name: string, label: string, type: string }]
  data: [any]
  resultName: string
  rowCount: number
  version: string
}

export default IVAData