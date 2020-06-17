import React, { Component } from "react";
import "./ThisYear.css";
import { readSheet } from "../GgleIO";
import {
  daysOfThisYear,
  thisYear,
  months,
  daysOfYear,
  reArrDays,
  daysTot,
} from "../refData";
import Spinner from "../Spinner";

let listDays = reArrDays.map((el, index) => <li key={index}>{el}</li>); // list up of xxxdays
let listMonths = months.map((el, index) => <li key={index}>{el}</li>);

//========================================================================
class ThisYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: "offGraph",
      found: "",
      attThis: [],
      spinner: true,
    };
  }

  async componentDidMount() {
    const rows = await readSheet(0); // index for First sheet of GgleSheet

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].Name === this.props.person) {
        this.setState({ found: i });
      }
    }

    let temp = rows[this.state.found]._rawData; // Extract daily attendance.
    let attend = []; // temp = ["Suhayb Power", "Tigertot", "/", "", ""...

    for (let i = 0; i < daysOfYear; i++) {
      let j = i + 2; //366 is better. Adding 1 more dummy day is not a big deal.
      let today = "",
        numA,
        numT,
        numSB = ""; // A, S, B, T = [all, spar, boardbreaking, test/start]

      if (daysTot === i + 1) {
        today = "T";
      }

      if (temp[j]) {
        let buf = temp[j].split("");
        numA = buf.filter((x) => x === "/" || x === "$" || x === "#").length;
        numT = buf.includes("!") ? "teststart" : "";
        numSB += buf.includes("#") ? "B" : "";
        numSB += buf.includes("$") ? "S" : "";

        attend.push([
          numA,
          reArrDays[i % 7],
          numT,
          numSB,
          today,
          temp[j],
          daysOfThisYear[i],
        ]); //Count the number of '/$#' occurrence.
      } else {
        let absent = daysOfThisYear[i].includes("Sun") ? "" : "Absent";
        attend.push([
          0,
          reArrDays[i % 7],
          "",
          "",
          today,
          absent,
          daysOfThisYear[i],
        ]); //day together.
      }
    }

    this.setState({ attThis: attend });
    this.setState({ graph: "gridBox" });
    this.setState({ spinner: false });

    // const daysOfThisYear = makeDayArray(thisYear);
  }

  // =====================================================================================
  render() {
    const { graph, attThis, spinner } = this.state;

    if (attThis === []) {
      return (
        <div>
          <div className="loadery">
            <h3>Loading...</h3>
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {spinner ? <Spinner /> : null}

          <h4 className="thisYear">Attendance {thisYear}</h4>
          <div className={graph}>
            <div className="graph">
              <ul className="months">{listMonths}</ul>
              <ul className="days">{listDays}</ul>
              <ul className="squares">
                {attThis.map((el, index) => (
                  <li
                    key={index}
                    data-level={el[0]}
                    sunday={el[1]}
                    teststart={el[2]}
                    today={el[4]}
                  >
                    {el[3]}{" "}
                    <span className="text">
                      [{el[6]}] {el[5].replace(/[$#]/g, "/")}
                    </span>
                  </li>
                ))}
                <li className="empty" key={attThis.length}></li>
                <li key={attThis.length + 1}>0</li>
                <li key={attThis.length + 2} data-level="1">
                  1
                </li>
                <li key={attThis.length + 3} data-level="2">
                  2
                </li>
                <li key={attThis.length + 4} data-level="3">
                  3
                </li>
              </ul>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ThisYear;
