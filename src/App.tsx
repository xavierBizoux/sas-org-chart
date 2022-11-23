import { Box, Divider, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Breadcrumb from './components/Breadcrumb'
import Node from './components/Node'
import buildSelection from './functions/buildSelection'
import buildTreeData from './functions/buildTreeData'
import sendMessageToVA from './functions/sendMessageToVA'
import INode from './interfaces/INode'
import IVAData from './interfaces/IVAData'
import IVADataEvent from './interfaces/IVADataEvent'
import IVASelection from './interfaces/IVASelection'

const App = () => {
  const [data, setData] = useState<INode[]>([])
  const [parent, setParent] = useState<INode>({} as INode)
  const [children, setChildren] = useState<INode[]>([])
  const [vaData, setVaData] = useState<IVAData>({} as IVAData)
  const [selectedNode, setSelectedNode] = useState<INode>()

  useEffect(() => {
    // Function to handle data received from VA
    const onDataReceived = (evt: IVADataEvent) => {
      if (evt && evt.data && evt.data?.data !== undefined) {
        const vaData: IVAData = evt.data
        // Check if data element exists in vaData object
        if (vaData.data) {
          // Keep the original data
          setVaData(vaData)
          // Transform data into a flatten tree structure
          const data = buildTreeData(vaData)
          setData(data)
        }
      }
    }
    // Listen for message coming from VA
    window.addEventListener("message", onDataReceived, false)
    return () => window.removeEventListener("message", onDataReceived)
  }, [vaData])

  useEffect(() => {
    // Process VA data and set the top level of the tree
    const node: INode = data.find(node => node.parentId === 0)!
    setParent(node)
    setSelectedNode(node)
  }, [data])

  useEffect(() => {
    // When parent state changes, update the children state
    if (parent) {
      setChildren(parent.children)
      setSelectedNode(parent)
    }
  }, [parent])

  useEffect(() => {
    // When selected node changes, send the selection information to VA
    if (selectedNode) {
      // Build selection array to be passed to VA
      const selection = buildSelection(selectedNode)
      // Format the selection to be passed to VA
      const vaSelection: IVASelection[] = []
      selection.forEach(row => vaSelection.push({ "row": row }))
      sendMessageToVA({ resultName: vaData.resultName, selections: vaSelection })
    }
  }, [selectedNode, vaData.resultName])

  // Function which identify the node which was expanded in the tree
  const navigationHandler = (id: number) => {
    const node = data.find(node => node.id === id)
    setParent(node!)
    setSelectedNode(node)
  }

  // Define the layout of the elements
  return (
    <Box>
      <Breadcrumb path={parent?.path || []} selectionHandler={setParent} data={data} ></Breadcrumb>
      <Grid container
        direction="column"
        alignItems="center"
        sx={{ minWidth: "100vw", maxWidth: "100vw" }} >
        <Grid container direction="column" alignItems="center" sx={{ minWidth: "100vw", maxWidth: "100vw" }}>
          <Node node={parent}
            navigationHandler={navigationHandler}
            selectionHandler={setSelectedNode}
            isTop={true}
            isSelected={selectedNode === parent}
          ></Node>
        </Grid>
        { vaData  ? <Divider>{vaData.columns[parent.level +1]['label']}</Divider> : null}
        {children && children.length > 0?
          <Grid container direction="row" alignItems="center" justifyContent="center" sx={{ borderColor: "secondary.main", border: 1, borderRadius: 3 }}>
            {children ? children.map(node => <Node node={node} navigationHandler={navigationHandler} selectionHandler={setSelectedNode} isTop={false} key={node.id} isSelected={selectedNode === node}></Node>) : null}
          </Grid>
          : null}
      </Grid>
    </Box >
  )
}

export default App
