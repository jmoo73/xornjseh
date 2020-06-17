import React, { Component } from "react";
import { Consumer } from "../context";
import ThisYear from "./ThisYear";
import PastYear from "./PastYear";
import store from "../../../store/store";
import Spinner from "../Spinner";
import Loader from "../../UI/Loader/Loader"
import RoundButton from "../../UI/Button/RoundButton";
import classes from './PersonalData.module.css'

class Personallog extends Component {
  state = {
    colorPick: "",
    personPick: "",
    names: [],
    graph: "off",
    pastYear: store.getState().auth.pastYearGgleID,
  };

  render() {
    const { colorPick, personPick, names, graph } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { states } = value;
          const { colors, White } = states;
          if (
            colors === undefined ||
            colors.length === 0 ||
            White === undefined ||
            White.length === 0
          ) {
            return (
              <div>
                <Loader />
                <Spinner />
              </div>
            );
          } else {
            return (
              <React.Fragment>
                <div className={classes.personData}>
                  <div className={classes.alnCenter}>
                    {colors.map((v, index) => {
                      if (colorPick) return null;
                      else
                        return (
                          <RoundButton
                            type="belt"
                            beltColor={v}
                            key={index}
                            clicked={() => {
                              this.setState({
                                colorPick: v,
                                names: states[v],
                                personPick: "",
                              });
                            }}
                          />
                        );
                    })}
                  </div>
                  <div className={classes.alnCenter}>
                    {names.map((v, index) => {
                      if (personPick) return null;
                      else
                        return (
                          <RoundButton
                            type="name"
                            key={index}
                            beltColor={colorPick}
                            clicked={() => {
                              this.setState({ personPick: v, graph: "on" });
                            }}
                          >
                            {v.split(" ")[0]}
                          </RoundButton>
                        );
                    })}
                  </div>
                  <div className={classes.alnCenter}>
                    {personPick ? (
                      <RoundButton
                        type="name"
                        beltColor={colorPick}
                        clicked={() => {
                          this.setState({
                            personPick: "",
                            graph: "off",
                            colorPick: "",
                            names: [],
                          });
                        }}
                      >
                        {personPick.split(" ")[0]}
                      </RoundButton>
                    ) : null}
                  </div>
                  {graph === "on" && (
                    <div className={classes.sqrGraph}>
                      <ThisYear person={personPick} />
                    </div>
                  )}
                  {false && graph === "on" && this.state.pastYear && (
                    <div className={classes.sqrGraph}>
                      <PastYear person={personPick} />
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Personallog;
