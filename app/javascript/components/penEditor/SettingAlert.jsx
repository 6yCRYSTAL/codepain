import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styled from '@emotion/styled'

const Test = styled.div`
  background-color: #FAA;
  color: black;
  font-weight: 900;
`

const SettingAlert = async () => {
  const MySwal = withReactContent(Swal)
  const ipAPI = '//api.ipify.org?format=json'

  const inputValue = fetch(ipAPI)
    .then(response => response.json())
    .then(data => data.ip)

  const { value: ipAddress } = await MySwal.fire({
    title: <Test>Testing</Test>,
    input: 'text',
    inputLabel: 'Your IP address',
    inputValue: inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  })

  if (ipAddress) {
    MySwal.fire(`Your IP address is ${ipAddress}`)
  }


  // MySwal.fire({





  // })



}




export default SettingAlert