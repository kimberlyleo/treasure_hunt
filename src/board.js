import React from 'react';
import './App.css';
import Square from './square.js'

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state={spaces: ["?","?","?","?","?","?","?","?","?"],
        eggLocation: null,
        bombLocation: null,
        gameOver: false,
        gameOutcome: null,
        counter: 5,
        }
    }

    componentDidMount = () => {
        const {spaces} = this.state
        let egg = Math.floor(Math.random()*spaces.length)
        let bomb = Math.floor(Math.random()*spaces.length)
        if(egg === bomb){
            bomb = Math.floor(Math.random()*spaces.length)
        }
        console.log(egg, bomb);
        this.setState({ eggLocation: egg, bombLocation: bomb})
    }

    restartGame = () => {
        this.setState({spaces: ["?","?","?","?","?","?","?","?","?"],
        eggLocation: null,
        bombLocation: null,
        gameOver: false,
        gameOutcome: null,
        counter: 5
        })
        this.componentDidMount()
    }

    handleIconLocation = (index) => {
        const {spaces, eggLocation, bombLocation, gameOver } = this.state
        if(eggLocation === index && gameOver === false) {
            spaces[index] = "🥚"
            this.setState({
                spaces: spaces
            })
            setTimeout(() => {
                this.setState({gameOver: true, gameOutcome: "You Win! 😃"})
            }, 500)
        } else if (bombLocation === index && gameOver === false) {
            spaces[index] = "💣"
            this.setState({
                spaces: spaces,
            })
            setTimeout(() => {
                this.setState({gameOver: true, gameOutcome: "You Lose! 💩"})
            }, 500)
        } else if (gameOver === false) {
            spaces[index] = "🦆"
            this.setState({spaces: spaces})
        }
        const counter = () => {
            let { counter } = this.state
            let newCount =  counter - 1
            this.setState({counter: newCount})
        }
        counter();

        if (this.state.counter === 1) {
            this.setState({gameOver: true, gameOutcome: "You Lose! 💩"})
        }
    }


    render(){
        let { spaces } = this.state
        let square = spaces.map((value,index) => {
            return(
                <div class="square">
                    < Square
                        value = { value }
                        index = { index }
                        key = { index }
                        handleIconLocation = { this.handleIconLocation }
                    />
                </div>
            )
        })

    return(
        <div>
        <h1>Treasure Hunt Challenge!</h1>
        <div id= "theWholeShabang">
            <div id = "board">
            { !this.state.gameOver &&
                <div id="gameBoard">
                { square }
                </div>
            }
            { this.state.gameOver &&
            <div id="outcomeBoard">
                { this.state.gameOutcome }
            </div>
            }
            <button onClick = { this.restartGame } id= "button">
            Restart Game
            </button>
            <div id="counter">
                Number of Tries Left: {this.state.counter}
            </div>
            </div>
            </div>
        </div>
        )
    }
}

export default Board;
