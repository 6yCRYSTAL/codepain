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
background: linear-gradient(to right, rgba(113,119,144,0.3), rgba(113,119,144,0));
border-left: 3px solid #444857;
margin-bottom: 20px;
`
const CdnContainerTitle = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #aaaebc;
  padding: 10px;
`
const SearchInputContainer = styled.div`
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
  const cssStorage = JSON.parse(localStorage.getItem('css'))
  const jsStorage = JSON.parse(localStorage.getItem('js'))

  const [searchQuery, setSearchQuery] = useState('')
  const [cssCdnList, setCssCdnList] = useState(cssStorage)
  const [jsCdnList, setJsCdnList] = useState(jsStorage)
  const [resourcesFound, setResourcesFound] = useState([])
  const [noResources, setNoResources] = useState(false);
  const [isBlur, setIsBlur] = useState(true)

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

  const atCdnSelecte = async (e) => {
    e.preventDefault()
    const randomurl = location.pathname.split('/pen/')[1]
    const url = e.currentTarget.dataset.url
    const urlArray = url.split('.')
    const category = urlArray[urlArray.length-1]
    let token = document.querySelector('meta[name = csrf-token]').content
    const response = await axios({
      method: 'post',
      url: '/api/v1/resources',
      data: {
        random_url: randomurl,
        category: category,
        url: url
      },
      headers: {
        'X-CSRF-Token': `${token}`
      }
    })
      .catch((err) => {
        console.log("Error: ", err);
      });
    if (response) {
      console.log("Response: ", response.status);
    }
  }

  const atCssCdnDelete = async (e) => {
    e.preventDefault()
    console.log(e)
    const cdnId = e.currentTarget.dataset.resource
    let token = document.querySelector('meta[name = csrf-token]').content
    const response = await axios({
      method: 'delete',
      url: `/api/v1/resources/${cdnId}`,
      headers: {
        'X-CSRF-Token': `${token}`
      }
    })
      .catch((err) => {
        console.log("Error: ", err);
      });
    if (response) {
      console.log("Response: ", response.status)
      let newList = cssCdnList.filter(resource => resource.id === cdnId)
      setCssCdnList(newList)
    }
  }

  const atJsCdnDelete = async (e) => {
    e.preventDefault()
    const cdnId = e.currentTarget.dataset.resource
    let token = document.querySelector('meta[name = csrf-token]').content
    const response = await axios({
      method: 'delete',
      url: `/api/v1/resources/${cdnId}`,
      headers: {
        'X-CSRF-Token': `${token}`
      }
    })
      .catch((err) => {
        console.log("Error: ", err);
      });
    if (response) {
      console.log("Response: ", response.status)
      let newList = jsCdnList.filter(resource => resource.id === cdnId)
      setJsCdnList(newList)
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
            // onBlur={atBlur}
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
                atBlur={atBlur}
                atFocus={atFocus}
                atClick={atCdnSelecte}
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
          cssCdnList.map(({url, id}) => {
            return(
              <CssCdn
                key={url}
                url={url}
                id={id}
                atCssCdnDelete={atCssCdnDelete}
                />
            )
          })
        }
      </CdnContainer>

      <CdnContainer>
        <CdnContainerTitle>JavaScript</CdnContainerTitle>
        {jsCdnList.length === 0 && <NoCdnImplemented>No resources implemented yet...</NoCdnImplemented>}
        {
          jsCdnList.map(({url, id}) => {
            return(
              <JsCdn
                key={url}
                url={url}
                id={id}
                atJsCdnDelete={atJsCdnDelete}
                />
            )
          })
        }
      </CdnContainer>
    </>
  )
}



export default EditorSettingContainer