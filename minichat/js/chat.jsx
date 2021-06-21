let ws = new WebSocket("wss://ws.jdedev.fr:8124")





ws.onclose = (data) => {
    console.log(data)
}

ws.onerror = (data) => {
    console.log(data)
}

ws.onopen = (data) => {
    console.log(data)
}



class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {connecte: false, name: "" , listUser: [], messEnCours: "", listMess: []}
    }

    clickBtn() {
        this.setState({connecte :!this.state.connecte})
        if(this.state.connecte == true) {
            this.setState({listUser: []})
        } else {
            let temp = [... this.state.listUser]
            temp.push({name:this.state.name})
            this.setState({listUser:temp})
        }
    }

    Name(event) {
        this.setState({name : event.target.value})
    }

    
    Message(event) {
        this.setState({messEnCours :event.target.value})
    }

    ClickSubmit() {
        let temp = [... this.state.listMess]
            temp.push({mess:this.state.messEnCours, user: this.state.name})
            this.setState({listMess:temp})
            this.setState({messEnCours : ""})
    }
      
    receivedUser (data) {
        let temp = [... this.state.listUser]
                temp.push({name:data.nom})
                this.setState({listUser:temp})
                console.log(temp)
    }

    receivedMessage (data) {
        let temp = [... this.state.listMess]
            temp.push({name:data.content})
            this.setState({listMess:temp})
            console.log(temp)
    }

    componentDidMount() {
        ws.onmessage = (data) => {
            console.log(data)
            let message = JSON.parse(data.data)
            console.log(message)
            
            if(message.typeTrame == "user") {
                this.receivedUser(message)
            } else {
                "non connecté"
            }
        
            if(message.typeTrame == "message") {
                this.receivedMessage(message)
            } else {
                "non reçu"
            }
        
            if(message.typeTrame == "lstUser") {
                
            } else {
                
            }
        
            if(message.typeTrame == "logOut") {
                
            } else {
                
            }
        }
    }

    render() {
        console.log(this.state.listUser)
        return(
            <React.Fragment>
                {(this.state.connecte==false) ? <InputLogin aff={this.clickBtn.bind(this)} chg={this.Name.bind(this)} name={this.state.name}/> : <InputLogout deco={this.clickBtn.bind(this)} name={this.state.name}/>}
                    <div className="contenu">
                        <Connect user={this.state.listUser}/>
                        
                        <Affichage connexion={this.state.connecte} change={this.Message.bind(this)} listMess={this.state.listMess} messEnCours={this.state.messEnCours} click={this.ClickSubmit.bind(this)} />
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
  
            <div className="search-container"><p className="hello">Bonjour {props.name}</p>
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
                    <input type="text" name="search" value={props.name} onChange={props.chg}/>
                    <button type="submit"  onClick={props.aff}>Login</button>
                </form>
            </div>
        </div>
    )
}

function Connect(props) {
    return(
        <div className="connect">
            <h2>Qui est là ?</h2>
            {props.user.map((ligne)=><p>{ligne.name}</p>)}
        </div>
    )
}

function Affichage(props) {
    return(
        <React.Fragment>
        <div className="ensemble">
            <div className="aff">
                <div className="affichage">{props.listMess.map((ligne)=><p className="mess">{ligne.user} : {ligne.mess}</p>)}</div>
                {(props.connexion == true) ? (

                
                <div className="message">
                    <textarea value={props.messEnCours} onChange={props.change} name="" id="" cols="30" rows="8"></textarea>
                    <button onClick={props.click} >Submit</button>
                </div>
                ):""}
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


