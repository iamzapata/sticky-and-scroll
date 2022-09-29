import { useEffect, useRef } from "react"
import "./App.css"
import Highcharts from "highcharts"
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

const List = (length = 10) => {
  return (
    <ul>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i}>{lorem[getIndex(lorem.length)]}</li>
      ))}
    </ul>
  )
}

function areElementsCollidingVertically(el1, el2) {
  const rect1 = el1.getBoundingClientRect()
  const rect2 = el2.getBoundingClientRect()

  console.info({ rect1, rect2 })

  return (
    rect1.top + rect1.height >= rect2.top &&
    rect2.top + rect2.height >= rect1.top
  )
}

function isElementAboveAnother(el1, el2) {
  const rect1 = el1.getBoundingClientRect()
  const rect2 = el2.getBoundingClientRect()

  const result = rect1.top < rect2.top

  console.info(result)
}

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
      data: [
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
      ],
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
    if (chartWrapperRef?.current && actionsRef?.current) {
      isElementAboveAnother(actionsRef.current, chartWrapperRef.current)
    }
  }, [chartWrapperRef?.current, actionsRef?.current])

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
        {Array.from({ length: 10 }, (_, i) => (
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
