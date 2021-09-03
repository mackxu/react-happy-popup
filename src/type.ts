import React from "react";

export type PortalProps = React.PropsWithChildren<{ node?: HTMLElement }>

export type Position = 'top' | 'right' | 'bottom' | 'left' | 'center'

// Popup 默认属性
export const defaultProps = {
  visible: false,
  position: 'center' as Position,
  mask: true,
  maskClosable: false,
  destroyOnClose: false,
  wrapClassName: '',
  onClose: () => {}
}

type PopupPropsWithoutChildren = { node?: HTMLElement } & typeof defaultProps

export type PopupProps = React.PropsWithChildren<PopupPropsWithoutChildren>

