import React, { Component } from "react";
import "./ThisYear.css";
import { readSheet } from "../GgleIO";
import {
  daysOfLastYear,
  lastYear,
  months,
  reArrDaysLast,
  daysOfYearLast,
} from "../refData";

let listDays = reArrDaysLast.map((el, index) => <li key={index}>{el}</li>); // list up of xxxdays
let listMonths = months.map((el, index) => <li key={index}>{el}</li>);

//========================================================================
class PastYear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: "offGraph",
      found: "",
      attPast: [],
    };
  }

  async componentDidMount() {
    const rows = await readSheet(0, 'lastYear'); // index for First sheet of GgleSheet

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].Name === this.props.person) {
        this.setState({ found: i });
      }
    }

    if (this.state.found !== "") {
      let temp = rows[this.state.found]._rawData; // Extract daily attendance.
      let attend = []; // temp = ["Suhayb Power", "Tigertot", "/", "", ""...

      for (let i = 0; i < daysOfYearLast; i++) {
        let j = i + 2; //366 is better. Adding 1 more dummy day is not a big deal.
        let numA,
          numT,
          numSB = ""; // A, S, B, T = [all, spar, boardbreaking, test/start]

        if (temp[j]) {
          let buf = temp[j].split("");
          numA = buf.filter((x) => x === "/" || x === "$" || x === "#").length;
          numT = buf.includes("!") ? "teststart" : "";
          numSB += buf.includes("#") ? "B" : "";
          numSB += buf.includes("$") ? "S" : "";

          attend.push([
            numA,
            reArrDaysLast[i % 7],
            numT,
            numSB,
            temp[j],
            daysOfLastYear[i],
          ]); //Count the number of '/$#' occurrence.
        } else {
          let absent = daysOfLastYear[i].includes("Sun") ? "" : "Absent";
          attend.push([0, reArrDaysLast[i % 7], "", "", absent, daysOfLastYear[i]]); //day together.
        }
      }

      this.setState({ attPast: attend });
      this.setState({ graph: "gridBox" });
    } else {
      this.setState({ found: "NotFound" });
    }
  }

  // =====================================================================================
  render() {
    const { graph, found, attPast } = this.state;

    if (found === "NotFound") return <h4> Not a member last year! </h4>;
    else if (attPast === undefined) {
      return <h1> Loading </h1>;
    } else {
      return (
        <React.Fragment>
          <h4 className="lastYear">Attendance {lastYear}</h4>
          <div className={graph}>
            <div className="graph">
              <ul className="months">{listMonths}</ul>
              <ul className="days">{listDays}</ul>
              <ul className="squares">
                {attPast.map((el, index) => (
                  <li
                    key={index}
                    data-level={el[0]}
                    sunday={el[1]}
                    teststart={el[2]}
                  >
                    {el[3]}{" "}
                    <span className="text">
                      [{el[5]}] {el[4].replace(/[$#]/g, "/")}
                    </span>
                  </li>
                ))}
                {/* <li className="empty" key={attPast.length}></li>
                <li key={attPast.length + 1}>0</li>
                <li key={attPast.length + 2} data-level="1">
                  1
                </li>
                <li key={attPast.length + 3} data-level="2">
                  2
                </li>
                <li key={attPast.length + 4} data-level="3">
                  3
                </li> */}
              </ul>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default PastYear;
