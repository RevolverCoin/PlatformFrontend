import React from 'react'
import Dropzone from 'react-dropzone'
import styled, { css } from 'styled-components'

const DropZoneContainer = styled.div`
width: 90%;
    height: 50px;
  border: 2px dashed #2c67d8;
  padding: 10px;

  ${props =>
    props.isDragActive &&
    css`
      border-color: green;
    `};
`

const DropZone = props => (
  <Dropzone onDrop={props.onDrop} style={{}} multiple={false} accept="image/*" >
    {({ isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => (
      <DropZoneContainer isDragActive={isDragActive} isDragReject={isDragReject}>
        Drop files here
      </DropZoneContainer>
    )}
  </Dropzone>
)

export default DropZone
