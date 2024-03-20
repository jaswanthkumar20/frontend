import { Component } from "react";
import Navbar from "../Navbar";
import "./index.css";

class Home extends Component {
  state = {
    deck: [],
    currentCard: null,
    diffuseCardCount: 0,
    cardIsShowing: false,
    gameOver: false,
    gameWon: false,
  };

  componentDidMount() {
    this.initializeDeck();
  }

  getRandomNumber = (min, max) => {
    return Math.floor((max - min + 1) * Math.random() + min);
  };

  initializeDeck = () => {
    const cards = [
      { cardName: "Cat card", cardTitle: "first title" },
      { cardName: "Defuse card", cardTitle: "second title" },
      { cardName: "Shuffle card", cardTitle: "third title" },
      { cardName: "Exploding kitten card", cardTitle: "forth title" },
    ];
    const temporaryDeck = [];

    for (let i = 0; i < 5; i++) {
      temporaryDeck.push(cards[this.getRandomNumber(0, cards.length - 1)]);
    }
    console.log(temporaryDeck);
    this.setState({ deck: temporaryDeck });
  };

  restartGame = () => {
    this.initializeDeck();
    this.setState({ diffuseCardCount: 0 });
    this.setState({ gameOver: false });
    this.setState({ gameWon: false });
  };

  handleCardShow = () => {
    const { deck } = this.state;
    const tempDeck = [...deck];
    const currCard = tempDeck[tempDeck.length - 1];
    this.setState({ currentCard: currCard });
    this.setState({ cardIsShowing: true });
    setTimeout(() => {
      if (
        tempDeck.length === 1 &&
        currCard.cardName !== "Shuffle card" &&
        currCard.cardName !== "Exploding kitten card"
      ) {
        this.setState({ gameWon: true });
      }
      if (currCard.cardName === "Cat card") {
        tempDeck.pop();
        this.setState({ deck: tempDeck });
      } else if (currCard.cardName === "Defuse card") {
        this.setState((prevState) => ({
          diffuseCardCount: prevState.diffuseCardCount + 1,
        }));
        tempDeck.pop();
        this.setState({ deck: tempDeck });
      } else if (currCard.cardName === "Shuffle card") {
        this.restartGame();
        this.handleCardShow();
      } else if (currCard.cardName === "Exploding kitten card") {
        const { diffuseCardCount } = this.state;
        if (diffuseCardCount > 0) {
          this.setState(
            (prevState) => ({
              diffuseCardCount: prevState.diffuseCardCount - 1,
            }),
            () => {
              tempDeck.pop();
              this.setState({ deck: tempDeck });
            }
          );
        } else {
          this.setState({ gameOver: true });
        }
      }
      this.setState({ currentCard: null });
      this.setState({ cardIsShowing: false });
    }, 2500);
  };

  scoreDetails = () => {
    const {
      deck,
      currentCard,
      diffuseCardCount,
      cardIsShowing,
      gameWon,
      gameOver,
    } = this.state;
    return (
      <>
        <Navbar />
        {gameWon ? (
          <div className="result">
            <div>
              <h1 className="result-won">You Won</h1>
              <button onClick={this.restartGame} className="restart-button">
                Restart
              </button>
            </div>
          </div>
        ) : gameOver ? (
          <div className="result">
            <div>
              <h1 className="result-over">Game Over</h1>
              <button onClick={this.restartGame} className="restart-button">
                Restart
              </button>
            </div>
          </div>
        ) : (
          <div className="board">
            <div className="container">
              <div className="card-count">
                <div className="deck-cards">
                  {deck &&
                    deck.map((card, ind) => (
                      <div key={ind} className={`card`}>
                        card {ind}
                      </div>
                    ))}
                </div>
              </div>
              {currentCard && (
                <div className="card active-card">{currentCard.cardName}</div>
              )}
              {!cardIsShowing && (
                <button onClick={this.handleCardShow} className="show-btn">
                  show card
                </button>
              )}
              <h2>Diffuse Cards Available - {diffuseCardCount} </h2>
            </div>
          </div>
        )}
      </>
    );
  };

  render() {
    return <div>{this.scoreDetails()}</div>;
  }
}

export default Home;
