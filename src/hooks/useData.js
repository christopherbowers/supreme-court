import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants'


export default function useData() {

    const [justices, setJustices] = useState([])
    const [cases, setCases] = useState([])
    const [decisionDates, setDecisionDates] = useState([])
    const [withVotes, setWithVotes] = useState([])
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
      const getJustices = async () => {
        await axios.get(`${baseUrl}/justices`).then((res) => {
          setJustices(res.data)
        })
      }
      const getCases = async () => {
        await axios.get(`${baseUrl}/cases?filter=landmark`).then((res) => {
          setCases(Object.values(res.data))
        })
      }
      getJustices()
      getCases()
    }, [])

    useEffect(() => {
      // Get decision dates and make a new array with only decision dates
      let newCases = cases.map((dataPoint) => {
        return dataPoint.decision_date
      })
      setDecisionDates(newCases)
    }, [cases])

    useEffect(() => {
      const addVoteCount = justices.map((justice) => {
        const startDate = justice.start_date

        let endDate = null
        // If justice end_date isn't set use today's date
        if (justice.finish_date === null) {
          endDate = new Date()
        } else {
          endDate = justice.finish_date
        }

        // Date math to filter cases in justice service years
        const filteredCases = decisionDates.filter(
          (item) =>
            new Date(item).getTime() >= new Date(startDate).getTime() &&
            new Date(item).getTime() <= new Date(endDate).getTime(),
        )

        return Object.assign(justice, {
          votes: filteredCases.length,
          start_year: parseInt(justice.start_date),
        })
      })

      if (decisionDates.length) {
        setWithVotes(addVoteCount)
      }
    }, [decisionDates])

  return withVotes
}
