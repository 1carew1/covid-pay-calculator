import React, { Component } from 'react';

class FullBody extends Component {

  constructor(props) {
      super(props)
      this.state = {
        TC : 275,
        USC : 0,
        PC : 0,
        GOV : 1516.67
      }
    }

  setJanNet(janNetEvent) {
    console.log(janNetEvent.target.value);
      this.setState({
        janNet : janNetEvent.target.value
      });
  }

  setFebNet(febNetEvent) {
    console.log(febNetEvent.target.value);
      this.setState({
        febNet : febNetEvent.target.value
      });
  }

  setTC(tcEvent) {
    console.log(tcEvent.target.value);
      this.setState({
        taxCredits : tcEvent.target.value
      });
  }

  setPC(event) {
    console.log(event.target.value);
      this.setState({
        PC : event.target.value
      });
  }

  setGov(event) {
    console.log(event.target.value);
      this.setState({
        GOV : event.target.value
      });
  }

  setUSC(uSCEvent) {
    console.log(uSCEvent.target.value);
      this.setState({
        USC : uSCEvent.target.value
      });
  }

  calculateNet(){
    const janNet = Number(this.state.janNet);
    if(!janNet){
        return 0;
    }
    console.log("Jan Net " + janNet);
    let febNet = Number(this.state.febNet);
    if(!febNet){
      febNet = janNet;
    }
    console.log("Feb Net " + febNet);
    const janNetAndFebNet = janNet + febNet;
    console.log("Jan Net and Feb Net " + janNetAndFebNet);
    const totalPay = ((Number(janNetAndFebNet)/9)*(52/12)) - Number(this.state.GOV);
    console.log("Total Pay " + totalPay);
    const totalGross = totalPay - Number(this.state.PC);
    console.log("Total Gross " + totalGross);
    const PAYE = Number(Number(totalGross)*0.2) - Number(this.state.TC);
    console.log("PAYE " + PAYE);
    const totalNet = totalGross - PAYE - Number(this.state.USC) + Number(this.state.GOV);
    console.log("Total Net " + totalNet);
    return totalNet;
  }

  render() {
    const calcNet = this.calculateNet();

    return (
        <div className="container-fluid">
           <div className="col-md-12">
             <div className="col-md-6">
                <p>calculator</p>
                <p>Jan Net : <input value={this.state.financialGoal} type="number" onChange={this.setJanNet.bind(this)}/></p>
                <p>Feb Net : <input value={this.state.financialGoal} type="number" onChange={this.setFebNet.bind(this)}/></p>
                <p>Tax Credits Per Month : <input value={this.state.financialGoal} type="number" onChange={this.setTC.bind(this)}/></p>
                <p>Pension Contribution : <input value={this.state.financialGoal} type="number" onChange={this.setPC.bind(this)}/></p>
                <p>Gov Subsidy : <input value={this.state.financialGoal} type="number" onChange={this.setGov.bind(this)}/></p>
                <p>USC : <input value={this.state.financialGoal} type="number" onChange={this.setUSC.bind(this)}/></p>
                <br/>
                <br/>
                <p>Net Net : <strong>€{calcNet}</strong></p>
             </div>
             <div className="col-md-6">
                <p>Formula for Total Pay = ((Jan Net + Feb Net)/9 weeks)(52 weeks/12 months) - Gov Subsidy</p>
                <p>If Jan Net and Feb Net the Same => ((2 (Jan Net))/9 weeks)(52 weeks/12 months)</p>
                <p>Let Jan Net = X , Tax Credits = TC, Pension Contribution = PC</p>
                <p>Gov Subsidy = €1516.67 per month</p>
                <br/>
                <br/>
                <p>Total Pay by company = (2X/9)(52/12) - 1516.67 = (26X/27) - 1516.67</p>
                <p>Total Gross Pay = Total Pay by company - Pension Contribution</p>
                <p>PAYE = 20% of Gross = 0.2((26X/27) - 1516.67 -PC) - TC</p>
                <p>Net Pay = Total Gross Pay - PAYE - USC + Gov Subsidy</p>
                <br/>
                <br/>
                <p>Net Pay = (26X/27) - 1516.67 - PC -(0.2((26X/27) - 1516.67 -PC)) - USC + TC + 1516.67</p>
                <p>Net Pay = (26X/27) -PC -(0.2((26X/27) - 1516.67 -PC)) - USC + TC</p>
                <br/>
                <br/>
                <p>Tax Credits <a href="https://www.citizensinformation.ie/en/money_and_tax/tax/income_tax_credits_and_reliefs/introduction_to_income_tax_credits_and_reliefs.html">Link</a></p>
                <p>Assuming TC = €275 per month and PC = €0</p>
                <p>Net Pay = (26X/27) -(0.2((26X/27) - 1516.67)) - USC + 275</p>
                <p>Net Pay = (26X/27) - 0.19259X + 303.334 - USC + 275</p>
                <p>Net Pay = 0.77041X + 578.334 - USC</p>
             </div>
           </div>
         </div>
      );
  }
}

export default FullBody;
