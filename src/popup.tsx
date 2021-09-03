import * as React from 'react'
import './index.less'
import { defaultProps, PopupProps, Position } from './type'
import Portal from './portal'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

// 类名前缀
const prefixCls = 'happy-popup'

// 动画时长
const duration = 300

// 位置与动画的映射
const animations: { [key in Position]: string } = {
  bottom: `${prefixCls}-slide-up`,
  right: `${prefixCls}-slide-left`,
  left: `${prefixCls}-slide-right`,
  top: `${prefixCls}-slide-down`,
  center: `${prefixCls}-fade`,
}

const Popup = (props: PopupProps) => {
  const firstRenderRef = useRef(false)
  const { visible } = props

  console.log(firstRenderRef.current, visible)

  if (!firstRenderRef.current && !visible) return null
  if (!firstRenderRef.current) {
    firstRenderRef.current = true
  }

  const {
    node,
    wrapClassName,
    mask,
    maskClosable,
    position,
    destroyOnClose,
    onClose,
    children,
  } = props

  // 容器节点的类名
  const rootCls = classNames(
    prefixCls,
    wrapClassName,
    `${prefixCls}__${position}`,
  )
  // 蒙层节点的类名
  const maskCls = classNames(
    `${prefixCls}-mask`,
    {
      [`${prefixCls}-mask__visible`]: mask,
    },
  )
  // 内容节点的类名
  const contentCls = classNames(
    `${prefixCls}-content`,
    `${prefixCls}-content__${position}`,
  )

  const onMaskClick = () => {
    if (maskClosable) {
      onClose()
    }
  }

  const contentAnimation = animations[position]

  return (
    <Portal node={node}>
      <div className={rootCls}>
        <CSSTransition
          in={visible}
          timeout={duration}
          classNames={`${prefixCls}-fade`}
          appear
        >
          <div className={maskCls} onClick={onMaskClick}></div>
        </CSSTransition>
        <CSSTransition
          in={visible}
          timeout={duration}
          classNames={contentAnimation}
          unmountOnExit={destroyOnClose}
          appear
        >
          <div className={contentCls}>{children}</div>
        </CSSTransition>
      </div>
    </Portal>
  )
}

Popup.propTypes = {
  visible: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  wrapClassName: PropTypes.string,
  onClose: PropTypes.func,
}

Popup.defaultProps = defaultProps

export default Popup
