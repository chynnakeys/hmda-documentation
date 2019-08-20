import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { Link } from 'react-router-dom'
import LoadingIcon from './common/LoadingIcon.jsx'

function makeUrl(year) {
  return `https://raw.githubusercontent.com/cfpb/hmda-documentation/master/markdown/${year}/LAR_data_fields.md`
}

const LarDataFields = props => {
  const [data, setData] = useState(null)
  const { year } = props.match.params

  useEffect(function (){
    fetch(makeUrl(year)).then(res => {
      res.text().then(setData)
    })
  }, [])

  useEffect(function (){
    if(!data) return
    const { hash } = window.location
    if(hash) {
      setTimeout(() => {
        const stripped = hash.replace(/[#_]/g, '')
        const id = stripped + stripped
        const element = document.getElementById(id)
        if (element) setTimeout(()=>element.scrollIntoView(), 0)
      }, 0)
    }
  })

  return (
    <div className="Markdown-Wrapper">
    <Link className="BackLink" to={`/${year}`}>{'\u2b05'} {year} DOCUMENTATION</Link>
    {data
      ? <Markdown>{data}</Markdown>
      : <LoadingIcon/>
    }
    </div>
  )
}

export default LarDataFields
