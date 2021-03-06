import React, { useState, useEffect } from 'react'
import 'grd'
import _ from 'lodash'
import styles from './index.scss'

import { getAPI } from '../../helper.js'

import Image from '../../component/Image/index.jsx'
import Divider from '../../component/Divider/index.jsx'

function EventsContainer () {
  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })

  const url = 'events'
  useEffect(() => {
    let mounted = true
    getAPI(url, (res) => {
      if (mounted) {
        setResponse(res)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  const events = _.get(response, 'body.allEvents') || []
  const renderevents = events.map(function (event, index) {
    return (
      <div key={index} className='Cell -3of12'>
        <Image
          className={styles.image}
          image={event.image}
          link={`/events/${event.id}`}
          subtitle={event.name}
        />
      </div>
    )
  })

  return (
    <div className={styles.container}>
      <Divider text="Events" />
      <div className='Grid -middle'>
        {renderevents}
      </div>
    </div>
  )
}

export default EventsContainer
