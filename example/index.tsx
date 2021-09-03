import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Popup } from '../.'
import '../dist/happy-popup.min.css'
import styled, { css } from 'styled-components'

const Button = styled.button`
    width: 120px;
    height: 40px;
  `
const common = css`
    background-color: #fcfcfc;
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `
const CenterContent = styled.div`
    ${common};
    height: 40px;
    border-radius: 4px;
  `
const TopContent = styled.div`
    ${common};
    height: 10px;
  `
const App = () => {

  const [visible, setVisible] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)

  const closePopup = () => {
    setVisible(false)
  }
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Click</Button>
      <Popup maskClosable visible={visible} onClose={closePopup} position="center">
        <CenterContent>test popup --</CenterContent>
      </Popup>
      <Button onClick={() => setVisible2(true)}>Click</Button>
      <Popup maskClosable visible={visible2} onClose={() => setVisible2(false)} position="top">
        <TopContent>Top</TopContent>
      </Popup>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
