import React, { useState } from 'react'
import styled from '@emotion/styled'

const CdnList = styled.div`
  width: 100%;
  background-color: #e3e4e8;
  border-radius: 4px;
  color: black;
  display: flex;
  justify-content: space-between;
`

const JsCdn = ({url}) => {
  return (
    <CdnList>
      {url}
      <i class="fas fa-times-circle"></i>
    </CdnList>
  )
}

export default JsCdn