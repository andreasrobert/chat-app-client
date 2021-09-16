import { RootStateOrAny, useSelector } from "react-redux";
import "./process.scss";

export default function Process() {
    // returns new state from the reducers
    const state = useSelector((state:RootStateOrAny ) => state.ProcessReducer);
    return (
      <div className="process">
        <h5>
          Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
        </h5>
        <div className="incoming">
          <h4>Incoming Data</h4>
          <p>{state.cypher}</p>
        </div>
        <div className="crypt">
          <h4>Decypted Data</h4>
          <p>{state.text}</p>
        </div>
      </div>
    );
  }
  