import React, { useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'

const ResultWrap = styled.div`
  width: 100%;
  min-height: 3em;
  background-color: #2c303a;
  position: relative;
  bottom: 0;
  padding: 15px;
  z-index: 10;
  border-bottom: 1px solid #5a5f73;
  &:hover, &:focus {
    background-color: #1e1f26;
    cursor: pointer;
  }
`
const NameVersionWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white
`
const ResultName = styled.div`
  font-size: 16px;
  font-weight: 400;
`
const ResultVersion = styled.div`
  font-size: 16px;
  font-weight: 400;
`
const ResultDescription = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #aaaebc;
  text-align: left;
`
const ResultUrl = styled.div`
  display: none;
`

// cdnName, cdnVersion, cdnDescription, cdnUrl

const SearchResult = ({name, latest, description, version, atClick, atBlur, atFocus}) => {
  return(
    <ResultWrap
      tabIndex='0'
      data-url={latest}
      onClick={atClick}
      onBlur={atBlur}
      onFocus={atFocus}
      >
      <NameVersionWrap>
        <ResultName>{name}</ResultName>
        <ResultVersion>{version}</ResultVersion>
      </NameVersionWrap>
      <ResultDescription>{description}</ResultDescription>
      <ResultUrl>{latest}</ResultUrl>
    </ResultWrap>
  )


}


export default SearchResult