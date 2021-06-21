let tabProd = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

/*tab() {
    let distinctStock = tabProd.filter((ligne, indice, tableau) => {
        return tableau.findIndex(elem) => elem.stocked === ligne.stocked
    })
}*/

class Tableau extends React.Component {
    constructor(props){
        super(props)
        this.state={rech:"", chk: false, tableau: [...tabProd] }
        this.chgRech =this.chgRech.bind(this)
        this.chgCheck =this.chgCheck.bind(this)
    }
    renvoisRayons() {
        let distinctRayons = this.state.tableau.filter((ligne, indice, tableau) => {
            return tableau.findIndex((elem) => elem.category === ligne.category) === indice
        })
        console.log(distinctRayons)
        return distinctRayons
    }

    renvoisProdRayon(nomRayon) {
        let produitRayon = this.state.tableau.filter((ligne, indice, tableau) => {
            return ligne.category === nomRayon
        }) 
        return produitRayon
    }

    /*affligne(data, key) {
        return (
            <tr key={key}>
                <td>
                    {data.name}
                </td>
                <td>
                    {data.price}
                </td>
            </tr>
        )
    }
    parcourTab() {
        let ret = []
        for (let i in tabProd) {
            ret.push(this.affligne(tabProd[i]))
        }
        return ret
    }*/

    chgRech(event) {
        this.setState({rech:event.target.value})
        this.setState({tableau: this.renvoisProdFiltre(this.state.chk, event.target.value)})
    }

    renvoisProdFiltre(stock, recherche) {
        if(stock == true) {
        let produitStock = tabProd.filter((ligne) => {
            return ligne.stocked === stock
        }) 
        let prodStockRet = produitStock.filter((ligne) => {
            return ligne.name.match(new RegExp(recherche, "i"))
        })
        return prodStockRet
        } else {
            let prodStockRet = tabProd.filter((ligne) => {
                return ligne.name.match(new RegExp(recherche, "i"))
            })
            return prodStockRet
        }
    }


    chgCheck(event) {
        this.setState({chk:event.target.checked})
        this.setState({tableau: this.renvoisProdFiltre(event.target.checked, this.state.rech)})
    }

    render() {
        let rayons = this.renvoisRayons()
        return (
            <React.Fragment>
                <InputRecherche etat={this.state.rech} chg={this.chgRech}/>
                <CheckStock etat={this.state.chk} chg={this.chgCheck}/>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rayons.map((ligne, key) => {
                                return <Rayon categ={ligne.category} key={key} tabProdRayon={this.renvoisProdRayon(ligne.category)}></Rayon>
                            })}
                        </tbody>
                    </table>
            </React.Fragment>
        )
    }
}

function Rayon(props) {
        return (
            <React.Fragment key={props.key}>
                
                <tr className="category">
                    <td colSpan="2">
                        {props.categ}
                    </td>
                </tr>
                {props.tabProdRayon.map((ligne) => {
                    return <Article ligne={ligne}></Article>
                })}
                
            </React.Fragment>
        )
    }


function Article (props) {
    
        return(
            <tr className={(props.ligne.stocked == false) ? "rouge": "noir"}>
                <td>{props.ligne.name}</td>
                <td>{props.ligne.price}</td>
            </tr>
        )
    
}

function InputRecherche(props) {
    return(
        <input type="text"  placeholder="Saisissez votre recherche" value={props.etat} onChange={props.chg}/>
    )
}

function CheckStock(props) {
    return(
        <div>
            <input type="checkbox" id="chlStock" checked={props.etat} onChange={props.chg}/> <label htmlFor="chkStock">Uniquement les articles en stock</label>
        </div>
    )
}

ReactDOM.render(<Tableau />, document.getElementById("liste"))