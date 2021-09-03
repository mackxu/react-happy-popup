import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { PortalProps } from './type'

const Portal = ({ node, children }: PortalProps) => {
  // 创建内部节点
  const defaultNodeRef = React.useRef<HTMLElement | null>(null)

  // 组件卸载时，移除该节点
  React.useEffect(() => () => {
    if (defaultNodeRef.current) {
      document.body.removeChild(defaultNodeRef.current)
    }
  }, [])
  if (!node && !defaultNodeRef.current) {
    const defaultNode = document.createElement('div')
    defaultNode.className = 'happy-popup__portal'
    defaultNodeRef.current = defaultNode
    document.body.appendChild(defaultNode)
  }
  return ReactDOM.createPortal(children, (node || defaultNodeRef.current)!)
}

Portal.propTypes = {
  node: PropTypes.instanceOf(HTMLElement),
  children: PropTypes.node,
}

export default Portal