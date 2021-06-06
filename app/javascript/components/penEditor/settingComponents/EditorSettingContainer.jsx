import React, { useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import CssCdn from './CssCdn'
import JsCdn from './JsCdn'
import SearchResults from './SearchResult'
import useDebounce from './Debounce'

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
const CdnContainer = styled.div`
display: flex;
flex-direction: column;
padding: 4px 0;
background: linear-gradient(to right, rgba(113,119,144,0.3), rgba(113,119,144,0));
border-left: 3px solid #444857;
margin-bottom: 20px;
`
const CdnContainerTitle = styled.div`
  width: 100%;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #aaaebc;
`
const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 10px;
  background-color: #e3e4e8;
  border-radius: 4px;
  margin-bottom: 20px;
`
const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  color: #1e1f26;
  font-weight: 400;
  border-radius: 3px;
  background-color: transparent;
  padding-left:10px;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #444857;
  }
`
const SearchResultsContainer = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% - 20px);
  z-index: 10;
`
const NoResultsMessage = styled.div`
  width: 100%;
  min-height: 3em;
  background-color: #2c303a;
  position: relative;
  bottom: 0;
  padding: 15px;
  z-index: 10;
  color: white;
`
const NoCdnImplemented = styled.div`
  width: 100%;
  min-height: 1em;
  padding: 5px;
  color: #5a5f73;
`

function EditorSettingContainer () {

  const [searchQuery, setSearchQuery] = useState('')
  const [cssCdnList, setCssCdnList] = useState([])
  const [jsCdnList, setJsCdnList] = useState([])
  const [resourcesFound, setResourcesFound] = useState([])
  const [noResources, setNoResources] = useState(false);
  const [isBlur, setIsBlur] = useState(true)
  const updateButton = document.querySelector('#btn-update')

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoResources(false);

    setSearchQuery(e.target.value);
  }

  const atBlur = () => {
    setIsBlur(true)
    setNoResources(false)
  }
  const atFocus = () => setIsBlur(false)


  const searchCdn = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setNoResources(false);

    const response = await axios({
      method: 'get',
      url: 'https://api.cdnjs.com/libraries',
      params: {
        search: `${searchQuery}`,
        limit: 6,
        fields: 'description,version'
      }
    })
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (response) {
      console.log("Response: ", response.data.results);
      if (response.data.results && response.data.results.length === 0) setNoResources(true);

      setResourcesFound(response.data.results);
    }
  }

  useDebounce(searchQuery, 500, searchCdn)

  const atCdnSelected = (e) => {
    e.preventDefault()
    if (updateButton) {
      const randomurl = location.pathname.split('/pen/')[1]
      const url = e.target.value
      const urlArray = url.split('.')
      const category = urlArray[urlArray.length-1]

      const response = await axios({
        method: 'post',
        url: '/api/v1/resources',
        params: {
          random_url: randomurl,
          category: category,
          url: url
        }
      })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
  }


  return(
    <>
      <SearchBarContainer>
        <SearchInputContainer>
          <div className="fas fa-search"></div>
          <SearchInput
            placeholder="Search for resources (React, axios, Tailwindcss...)"
            tabIndex='0'
            onBlur={atBlur}
            onFocus={atFocus}
            value={searchQuery}
            onChange={changeHandler}
          />
        </SearchInputContainer>
        <SearchResultsContainer>
        {noResources && <NoResultsMessage>No resources found...</NoResultsMessage>}
        {
          !isBlur && resourcesFound.map(({name, latest, description, version}, index) => {
            return(
              <SearchResults
                key={index}
                name={name}
                latest={latest}
                description={description}
                version={version}
                onBlur={atBlur}
                onFocus={atFocus}
                onClick={atCdnSelected}
                />
            )
          })
        }
        </SearchResultsContainer>
      </SearchBarContainer>

      <CdnContainer>
        <CdnContainerTitle>CSS</CdnContainerTitle>
        {cssCdnList.length === 0 && <NoCdnImplemented>No resources implemented yet...</NoCdnImplemented>}
        {
          cssCdnList.map((url, id) => {
            return(
              <CssCdn
                url={url}
                id={id}
                />
            )
          })
        }
      </CdnContainer>

      <CdnContainer>
        <CdnContainerTitle>JavaScript</CdnContainerTitle>
        {jsCdnList.length === 0 && <NoCdnImplemented>No resources implemented yet...</NoCdnImplemented>}
        {
          jsCdnList.map((url, id) => {
            return(
              <JsCdn
                url={url}
                id={id}
                />
            )
          })
        }
      </CdnContainer>
    </>
  )
}



export default EditorSettingContainer