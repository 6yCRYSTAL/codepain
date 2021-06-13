import React from 'react'
import styled from '@emotion/styled'

const Nothing = ({ searchValue,searchNoData }) =>{
  const MakePen = styled.a`
    border-radius: 4px;
    background: #47cf73;
    padding: 1rem;
    display: inline-block;
    color: black;
    font-size: 1rem;
    &:hover{
      background: #248c46;
    }
  `
  return(
    <div className="no-deleted-pen no-search-pen">
      {
        (!searchNoData) ?
        <>
          <h2>You haven't created any Pens yet.</h2>
          <MakePen href="/pen">
            Go make one!
          </MakePen>
        </>:
        <>
          <h2>No results for <em>{ searchValue }</em>.</h2>
          <blockquote
            style={{
              maxWidth: '25em',
              margin: '2rem auto'
            }}>
            If you want to save our world, you must hurry. We don't know how much longer we can withstand the nothing.<br /><br /><cite>— Southern Oracle, The Neverending Story</cite>
          </blockquote>
        </>
      }
    </div>
  )
};
export default Nothing