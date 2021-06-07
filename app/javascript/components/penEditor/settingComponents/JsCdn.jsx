import React, { useState } from 'react'
import styled from '@emotion/styled'

const CdnList = styled.div`
color: white;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 10px;
padding: 10px;
text-align: left;
border-bottom: 1px solid #717790;
div {
  font-size: 20px;
  padding-left: 10px;
  cursor: pointer;
}
`

const JsCdn = ({url, id, atJsCdnDelete}) => {
  return (
    <CdnList>
      {url}
      <div data-resource={id} onClick={atJsCdnDelete}>
        <i className="fas fa-times-circle"></i>
      </div>
    </CdnList>
  )
}

export default JsCdn