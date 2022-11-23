import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Badge, Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import INode from '../interfaces/INode'

interface INodeProps {
  node: INode
  navigationHandler(id: number): void
  selectionHandler(node: INode): void
  isTop: boolean
  isSelected: boolean
}

const Node = ({ node, navigationHandler, selectionHandler, isTop, isSelected }: INodeProps) => {
  // Define the style to be applied to the nodes
  const cardStyle = {
    minWidth: "200px",
    maxWidth: "200px",
    margin: 2,
    border: isSelected ? 2 : 0,
    borderColor: isSelected ? "secondary.main" : 0
  }
  // Display the node
  if (node && node.id) {
    return (
      <Card raised={isSelected} sx={cardStyle} onClick={() => selectionHandler(node)}>
        {isTop && node.parentId !== 0 ?
          <CardActions sx={{ display: "flex", justifyContent: "center", margin: 0, padding: 0 }} >
            <IconButton size="small" color="primary" onClick={() => navigationHandler(node.parentId)}>
              <ExpandLessIcon />
            </IconButton>
          </CardActions>
          : null
        }
        <CardContent sx={{ margin: 0, padding: 0 }}>
          <Grid container direction="column" alignItems="center" sx={{ width: "100%" }}>
            <Grid item sx={{ width: "100%", padding: 1, color: "white", bgcolor: "primary.main" }}>
              <Tooltip title={node.name}>
                <Typography variant="h5" align="center" noWrap sx={{ padding: 2, maxWidth: "100cw" }}>
                  {node.name}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center", margin: 0, padding: 0 }} >
        {!isTop && node.children.length > 0 ?
            <IconButton size="small" color="primary" sx={{ padding: 0, margin: 0 }} onClick={() => navigationHandler(node.id)}>
              <Badge badgeContent={node.children.length} color="secondary" sx={{ px: 1 }} >
                <ExpandMoreIcon />
              </Badge>
            </IconButton>
          : null
        }
        </CardActions>
      </Card>
    )
  } else {
    return null
  }
}

export default Node
