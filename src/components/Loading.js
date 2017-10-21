import React from 'react'
import styled, { keyframes } from 'styled-components'

const cudeGridScaleDelay = keyframes`
0%, 70%, 100% {
          transform: scale3D(1, 1, 1);
} 35% {
          transform: scale3D(0, 0, 1);
}
`

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Grid = styled.div`
width: 80px;
height: 80px;
margin: 100px;
margin-right: 5px;
display: inline-block;
position: relative;
`
const Cube = styled.div`
width: 33%;
height: 33%;
background-color: orange;
float: left;
animation: ${cudeGridScaleDelay} 1.3s infinite ease-in-out;
-webkit-animation-delay: ${props => props.delay}s;
        animation-delay: ${props => props.delay}s;
`

const Text = styled.h2`
color: dimgray;
line-height: 80px;
margin-left: 20px;
font-size: 26px;
font-family: sans-serif;
`

let delays = {
  0: '0.2', 1: '0.3', 2: '0.4',
  3: '0.1', 4: '0.2', 5: '0.3',
  6: '0',   7: '0.1', 8: '0.2'
}

export const Loading = props => (
  <Content>
    <Grid>
      {Array.from(new Array(9), (_, i) => (
        <Cube key={i} delay={delays[i]} />
      ))}
    </Grid>
    <Text>Loading Content</Text>
  </Content>
)