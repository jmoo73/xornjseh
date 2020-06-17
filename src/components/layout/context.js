import React, { Component } from "react";
import { days, colors } from "./refData"; // days : list of days of week
import { readSheet } from "./GgleIO";

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    names: [],
    beltColors: [], // names and beltColors correspond.
    colors: colors,
    Tigertot: [], // Read names assorted by belt colors
    White: [],
    Yellowstr: [],
    Yellow: [],
    Greenstr: [],
    Green: [],
    Bluestr: [],
    Blue: [],
    Redstr: [],
    Red: [],
    Blackstr: [],
    Bodon: [],
    Black: [],
    whatDay: [], //Date here ['4/26/2020', 'Monday']
    dailyClasses: [], // dailyclasses ['Tigertor', ..., 'Teen and Adult']

    attender: {}, //  { class1: [] ...}. initialized to be { cl1: []}
    count: [], // [ cl1, cl2, cl3, cl4, cl5...]. init to be {0, 0, 0, 0, 0}
    color: "White",
    currClass: 0,
    namesChosen: [], // This is for upgrade belt
  };

  async componentDidMount() {
    const rows = await readSheet(0); // first sheet
    const rowsClasses = await readSheet(1); // second sheet
    const rowsAtt = await readSheet(0, true); // Access common Dailylog file.

    let names = rows.map((row) => row.Name);
    let belts = rows.map((row) => row.Beltcolor);

    // Getting current date and day and remove null classes
    const now = new Date();
    let day = days[now.getDay()];
    let classes = rowsClasses.map((row) => row[day]);
    classes = classes.filter((item) => item !== undefined);
    classes = classes.filter((item) => item !== "");

    const date =
      now.getMonth() + 1 + "/" + now.getDate() + "/" + now.getFullYear();
    //Total number of class attender is added.
    let countTemp = [];
    for (let i = 0; i < rowsAtt.length; i++) {
      if (rowsAtt[i].Date === date) {
        for (let j = 0; j < classes.length; j++) {
          let x = "Class" + (j + 1);
          let temp = rowsAtt[i][x];
          if (temp) countTemp[j] = parseInt(temp);
          else countTemp[j] = 0;
        }
        this.setState({ count: countTemp });
        break;
      }
    }

    //Getting date for indexing of Ggle sheet
    let dates = [date, day];

    // Sorting out members following their belt colors
    for (let i = 0; i < this.state.colors.length; i++) {
      let temp = [];
      let color = this.state.colors[i];
      for (let j = 0; j < names.length; j++) {
        if (belts[j] === color) {
          temp.push(names[j]);
        }
      }
      this.setState({ [color]: temp });
    }
    this.setState({ names: names });
    this.setState({ beltColors: belts });
    this.setState({ dailyClasses: classes });
    this.setState({ whatDay: dates });

    //Initialize. count and attender.
    let attender = {};
    attender[this.state.dailyClasses[0]] = [];
    this.setState({ attender: attender });
  }

  stateSetter = (val) => {
    this.setState(val);
  };

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{ states: this.state, stateSetter: this.stateSetter }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
