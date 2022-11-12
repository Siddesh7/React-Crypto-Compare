import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import logo from "./images/logo.png";
import { useEffect } from "react";
import footer from "./images/footer.png";
function CardList(props) {
  return (
    <div className="card 1">
      <div className="card_image">
        <img alt="" src="https://wallpaperaccess.com/full/395716.jpg" />
      </div>
      <h1 className="coin">{props.name}</h1>
      <div className="card_title title-white">
        <div className="item">
          <p>Wazirx:</p>
          <p>₹ {props.wrx}</p>
        </div>
        <div className="item">
          <p>CoinDCX:</p>
          <p>₹ {props.dcx}</p>
        </div>
        <div className="item">
          <p>Bitbns:</p>
          <p>₹ {props.bns}</p>
        </div>
      </div>
      <a className="link" href={props.exlink} target="_blank" rel="noreferrer">
        Buy from {props.best}
      </a>
    </div>
  );
}

const MyComponent = () => {
  const [showElement, setShowElement] = React.useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 4000);
  }, []);

  return (
    <div>
      <div>
        {showElement ? (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              position: "fixed",
              zIndex: "100",
              display: "flex",
              fontSize: "40px",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "roboto",
              opacity: showElement ? 1 : 0,
            }}
          >
            <section id="preloader" class="preloader">
              <h2>Loading</h2>
              <div class="progress">
                <div class="indeterminate"></div>
              </div>
            </section>
          </div>
        ) : (
          <div></div>
        )}{" "}
      </div>
    </div>
  );
};

class App extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.getCrypto();
    this.interval = setInterval(() => {
      this.getCrypto();
    }, 5000);
  }

  getCrypto() {
    fetch("https://api-c4crypto.herokuapp.com/")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          data: res,
        });
      });
  }
  sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <section>
        <div>
          <nav>
            <img src={logo} className="logo" alt="c4crypto" />
          </nav>
          <MyComponent />

          <h2 className="h">Buy Cryptocurrencies at the cheapest price!</h2>
          <p className="p">Price updates every 5 seconds</p>
          <div className="cards-list">
            {this.state.data.map((item) => {
              return (
                <CardList
                  key={item.name}
                  name={item.name}
                  wrx={item.wrx}
                  dcx={item.dcx}
                  bns={item.bns}
                  best={item.best}
                  exlink={item.exlink}
                />
              );
            })}
          </div>
        </div>
        <div className="foo-div">
          <a
            href="https://c4crypto.me"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img className="foo" src={footer} alt="footer" />
          </a>
        </div>
      </section>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
