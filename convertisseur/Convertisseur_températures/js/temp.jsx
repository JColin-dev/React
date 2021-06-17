class Convertisseur extends React.Component {
    constructor(props) {
        super(props)
        this.state = {temp: 0}
    }
    
    conv() {
        let temp = (tF = tC * 1,8 + 32)
        this.setState({temp})
    }

    chgTemp(event) {
        this.setState({temp: event.target.value})
    }

    chgCtoF(event) {
        this.setState({temp: ((event.target.value - 32 ) * 5/9)})
    }

    render() {
        return(
            <div>
                <label htmlFor="Celsius">Température °C</label>
                <input type="text" value={this.state.temp} onChange={this.chgTemp.bind(this)}/>
                <label htmlFor="Fahrenheit">Température F°</label>
                <input type="text" value={((this.state.temp*9/5)+32)} onChange={this.chgCtoF.bind(this)}/>
                {(this.state.temp < 100) ? <p>L'eau ne bout pas</p> : <p>L'eau bout</p>}
            </div>
        )
    }
}

ReactDOM.render(<Convertisseur></Convertisseur>, document.getElementById('conv'))