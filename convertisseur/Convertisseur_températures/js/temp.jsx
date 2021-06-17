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
                <Temperature unite = "Celsius" val={this.state.temp} chg={this.chgTemp.bind(this)} ></Temperature>
                <Temperature unite = "Fahrenheit" val={((this.state.temp*9/5)+32)} chg={this.chgCtoF.bind(this)} ></Temperature>
                {(this.state.temp <= 100) ? <p>L'eau ne bout pas</p> : <p>L'eau bout</p>}
            </div>
        )
    }
}

function Temperature(props) {
    return (
        <React.Fragment>
            <label htmlFor={props.unite}>Température °C</label>
            <input type="text" id={props.unite} value={props.val} onChange={props.chg} />
        </React.Fragment>
    )
}

ReactDOM.render(<Convertisseur></Convertisseur>, document.getElementById('conv'))