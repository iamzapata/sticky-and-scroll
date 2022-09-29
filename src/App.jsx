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

const List = () => {
  return (
    <ul>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i}>{lorem[getIndex(lorem.length)]}</li>
      ))}
    </ul>
  )
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

  useEffect(() => {
    let options = {
      root: chartWrapperRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    }

    function callback(entries, observer) {
      console.log({ entries, observer })

      entries.forEach((entry) => {
        console.log({ entry })
      })
    }

    let observer = new IntersectionObserver(callback, options)

    return () => {
      // cleanup
    }
  }, [chartWrapperRef?.current])

  return (
    <div className="App">
      <div className="LeftBlock">
        <h3>Hello World</h3>

        <div ref={chartWrapperRef}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
          />
        </div>

        <div className="Buttons" ref={actionsRef}>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
      <div className="MiddleBlock"></div>
      <div className="RightBlock">
        {Array.from({ length: 10 }, (_, i) => (
          <List key={i} />
        ))}
      </div>
    </div>
  )
}

export default App
