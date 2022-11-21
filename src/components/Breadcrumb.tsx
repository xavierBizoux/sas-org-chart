import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import ILevel from '../interfaces/ILevel'
import INode from '../interfaces/INode'

interface IBreadcrumbsProps {
  path: string[]
  data: INode[]
  selectionHandler(node: INode | undefined): void
}

const Breadcrumb = ({ path, data, selectionHandler }: IBreadcrumbsProps) => {
  // Define the breadcrumbs elements
  const breadcrumbs: ILevel[] = []
  // Define the node which is bound to the breadcrumbs element
  path.forEach((el, idx) => {
    const node: INode | undefined = data.find(node => (node && node.path) ? node.path.concat(node.name).toString() === path.slice(0, idx + 1).toString() : false)
    const level: ILevel = { "label": el, "node": node, }
    breadcrumbs.push(level)
  })
  // Display the breadcrumb element
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb">
      {breadcrumbs.map((level, idx) => (
        <Typography variant="button"
          key={idx}
          color="inherit"
          onClick={() => { selectionHandler(level.node) }}>
          {level.label}
        </Typography>
      )
      )
      }
    </Breadcrumbs>
  )
}

export default Breadcrumb