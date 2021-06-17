class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {d :new Date(), inp: "salut", aff: false}
    }
    componentDidMount(){
        this.time = setInterval(this.chgDate.bind(this), 500)
    }
    componentWillUnmount() {
        clearInterval(this.name)
    }
    chgDate() {
        this.setState({d : new Date()})
    }
    chgInp(event){
        console.log(event.target.value)
        this.setState({inp : event.target.value})
    }
    clickBtn() {
        this.setState({aff: !this.state.aff})
    }
    render() {
        return(
            <div>
                <p>Bonjour, {this.state.inp}</p>
                <p>Il est {this.state.d.toLocaleTimeString()}</p>
                <input type="text" value={this.state.inp} onChange={this.chgInp.bind(this)}/>
                {(this.state.aff==true) ? <p>On affiche</p> :""}
                <button onClick={this.clickBtn.bind(this)}>Affiche</button>
            </div>
        )
    }
}

let texte = (
 <React.Fragment>
<h1>Bonjour tout le monde !</h1>
<Welcome name="John" lastName=" Colin"></Welcome>
</React.Fragment>
)
ReactDOM.render(texte, document.getElementById('app'))