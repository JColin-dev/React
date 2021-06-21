class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {connecte: false, name: ""}
    }

    clickBtn() {
        this.setState({connecte :!this.state.connecte})
    }

    Name(event) {
        this.setState({name : event.target.value})
    }

    render() {
        return(
            <React.Fragment>
                {(this.state.connecte==false) ? <InputLogin aff={this.clickBtn.bind(this)}/> : <InputLogout deco={this.clickBtn.bind(this)}/>}
                    <div className="contenu">
                        <Connect/>
                        <Affichage/>
                    </div>
                        <Footer/>
            </React.Fragment>
        )
    }
}
function InputLogout(props) {
    return(
        <React.Fragment>
        <div className="topnav">
            <h1>Mimichat</h1>
  
            <div className="search-container"><p className="hello">Bonjour</p>
            <button className="btn" type="submit" onClick={props.deco}>Déconnexion</button>
            </div>
        </div>
        </React.Fragment>
    )
}

function InputLogin(props) {
    return(
        <div className="topnav">
            <h1>Mimichat</h1>
  
            <div className="search-container">
                <form>
                    <input type="text" name="search"/>
                    <button type="submit" value={this.state.name} onChange={this.Name.bind(this)} onClick={props.aff}>Login</button>
                </form>
            </div>
        </div>
    )
}

function Connect(props) {
    return(
        <div className="connect">
            <h2>Qui est là ?</h2>
        </div>
    )
}

function Affichage(props) {
    return(
        <React.Fragment>
        <div className="ensemble">
            <div className="aff">
                <div className="affichage"></div>
                <div className="message">
                    <textarea name="" id="" cols="30" rows="8"></textarea>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

function Message(props) {
    return(
        <div className="message">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <input type="submit" value="Envoyer" />
        </div>
    )
}

function Footer(props) {
    return(
        <div className="footer">
            <p>John Colin</p>
        </div>
    )
}



ReactDOM.render(<Chat />, document.getElementById("app"))