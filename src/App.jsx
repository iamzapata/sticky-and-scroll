import { useEffect, useRef } from "react"
import "./App.css"
import Highcharts, { chart } from "highcharts"
import HighchartsReact from "highcharts-react-official"

const lorem = [
  "Phasellus laoreet lorem vel dolor tempus vehicula.",
  "A communi observantia non est recedendum.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Quisque ut dolor gravida, placerat libero vel, euismod.",
  "Phasellus laoreet lorem vel dolor tempus vehicula.",
  "A communi observantia non est recedendum.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Quisque ut dolor gravida, placerat libero vel, euismod.",
  "Phasellus laoreet lorem vel dolor tempus vehicula.",
  "A communi observantia non est recedendum.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Quisque ut dolor gravida, placerat libero vel, euismod.",
  "A communi observantia non est recedendum.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Quisque ut dolor gravida, placerat libero vel, euismod.",
  "A communi observantia non est recedendum.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Quisque ut dolor gravida, placerat libero vel, euismod.",
  "A communi observantia non est recedendum.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Quisque ut dolor gravida, placerat libero vel, euismod.",
  "Cras mattis iudicium purus sit amet fermentum.",
  "Magna pars studiorum, prodita quaerimus.",
  "Ullamco laboris nisi ut aliquid ex ea commodi consequat.",
  "Quo usque tandem abutere, Catilina, patientia nostra?",
  "Curabitur est gravida et libero vitae dictum.",
]

const getIndex = (length) => Math.round(Math.random() * length)

let index = 0

const List = () => {
  const name = browsers[index++ % browsers.length].name
  return (
    <section className="Section" data-browser={name}>
      <h3>{name}</h3>
      <ul>
        {Array.from({ length: 9 }, (_, i) => (
          <li key={i}>{lorem[getIndex(lorem.length)]}</li>
        ))}
      </ul>
    </section>
  )
}

const browsers = [
  {
    name: "Chrome",
    y: 70.67,
    sliced: true,
    selected: true,
  },
  {
    name: "Edge",
    y: 14.77,
  },
  {
    name: "Firefox",
    y: 4.86,
  },
  {
    name: "Safari",
    y: 2.63,
  },
  {
    name: "Internet Explorer",
    y: 1.53,
  },
  {
    name: "Opera",
    y: 1.4,
  },
  {
    name: "Sogou Explorer",
    y: 0.84,
  },
  {
    name: "QQ",
    y: 0.51,
  },
  {
    name: "Other",
    y: 2.6,
  },
]

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Browser market shares in May, 2020",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
    },
  },
  series: [
    {
      name: "Brands",
      colorByPoint: true,
      data: browsers,
    },
  ],
}

function App() {
  const chartWrapperRef = useRef(null)
  const chartComponentRef = useRef(null)
  const actionsRef = useRef(null)
  const rightBlockRef = useRef(null)
  const leftBlockRef = useRef(null)

  useEffect(() => {
    const elCards = document.getElementsByClassName("card")

    const watchContainer = (entries) => {
      entries.forEach((entry) => {
        entry.target.style.opacity = entry.isIntersecting ? "1" : "0"
      })
    }

    const observer = new IntersectionObserver(watchContainer, {
      rootMargin: "20%", // for some reason this isn't working on codepen...
      threshold: 0,
    })

    observer.observe(elCards[0])
    observer.observe(elCards[1])
    observer.observe(elCards[2])
    observer.observe(elCards[3])
  }, [rightBlockRef?.current])

  useEffect(() => {
    const sections = document.getElementsByClassName("Section")
    const chart = chartComponentRef.current.chart

    const watchContainer = (entries) => {
      entries.forEach((entry) => {
        const { attributes } = entry.target
        const browserInView = attributes.getNamedItem("data-browser").value
        const getChartNodeIndex = chart.series[0].data.findIndex(
          (i) => i.options.name === browserInView
        )
        chart.tooltip.refresh(chart.series[0].data[getChartNodeIndex])
      })
    }

    const observer = new IntersectionObserver(watchContainer, {
      threshold: 0.5,
    })

    Array.from(sections).forEach((section) => observer.observe(section))
  }, [rightBlockRef?.current, chartComponentRef?.current])

  useEffect(() => {
    if (chartComponentRef?.current?.chart) {
      window.chart = chartComponentRef.current.chart
    }
  }, [chartComponentRef?.current])

  return (
    <div className="App">
      <div className="LeftBlock" ref={leftBlockRef}>
        <h3>Hello World</h3>

        <div className="ChartWrapper" ref={chartWrapperRef}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
          />
          <div>
            <ol>
              <li>Nec dubitamus multa iter quae et nos invenerat.</li>
              <li>A communi observantia non est recedendum.</li>
              <li>Unam incolunt Belgae, aliam Aquitani, tertiam.</li>
            </ol>
          </div>
        </div>

        <div className="Buttons" ref={actionsRef}>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
      <div className="MiddleBlock"></div>
      <div className="RightBlock" ref={rightBlockRef}>
        {Array.from({ length: 9 }, (_, i) => (
          <List key={i} />
        ))}
        <h1>Hello! Please scroll down</h1>
        <div className="spacer"> A white space...</div>
        <div className="cards">
          <div className="card debug-0">One</div>
          <div className="card debug-1">Two</div>
          <div className="card debug-2">Three</div>
          <div className="card debug-3">Four</div>
        </div>
        <div className="spacer"> A white space...</div>
        The end.
      </div>
    </div>
  )
}

export default App
