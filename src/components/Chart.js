import { useEffect, useState } from 'react'
import * as d3 from 'd3'
import useData from '../hooks/useData'

export default function Chart() {

  const withVotes = useData()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function drawChart() {
      const parseDate = d3.timeParse('%Y')
      const margin = { top: 10, right: 40, bottom: 50, left: 30 },
        width = 1200 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom

      // const width = parseInt(d3.select('#scatter').style('width'), 10)
      // const height = width / 2

      d3.selectAll('#scatter > *').remove()

      const x = d3.scaleTime().range([0, width])
      const y = d3.scaleLinear().range([height, 0])

      x.domain(
        d3.extent(withVotes, function (d) {
          return parseDate(d.start_year)
        }),
      )
      y.domain([0, d3.max(withVotes, function (d) {
          return d.votes
        }),
      ])

      const svg = d3
        .select('#scatter')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        // .attr('viewbox', `0 0 ${width} ${height}`)
        // .attr('preserveAspectRatio','xMinYMin meet')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      svg
        .selectAll('dot')
        .data(withVotes)
        .enter()
        .append('circle')
        .attr('r', 2)
        .attr('cx', function (d) {
          return x(parseDate(d.start_year))
        })
        .attr('cy', function (d) {
          return y(d.votes)
        })
        .attr('stroke', '#2649D8')
        .attr('stroke-width', 1.5)
        .attr('fill', '#FFFFFF')

      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
      svg.append('g').call(
        d3.axisLeft(y).tickFormat(function (d) {
          return d
        }),
      )
    }

    if (withVotes.length) {
      setLoading(false)
    }

    if (!loading) {
      drawChart()
    }

  }, [withVotes, loading])


  if (loading) {
    return <>Loading...</>
  } else

  return (
    <div className="chart-wrapper">
      <h2>Data</h2>
      <div id="scatter" />
    </div>
  )
}
