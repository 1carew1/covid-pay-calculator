import React, { Component } from 'react';

class FullBody extends Component {

  constructor(props) {
      super(props)
      this.state = {
        TC : 275,
        USC : 0,
        PC : 0,
        GOV : 1516.67,
        WEEKS_IN_YEAR : 52
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
        TC : tcEvent.target.value
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

  round(num){
    return Math.round(Number(num) * 100) / 100
  }

  govCalc(){
    let janNet = Number(this.state.janNet);
    let febNet = Number(this.state.febNet);
    if(!janNet && !febNet){
        return 0;
    }
    console.log("Jan Net " + janNet);
    if(!febNet){
      febNet = janNet;
    }
    if(!janNet) {
      janNet = febNet;
    }
    console.log("Feb Net " + febNet);
    const janNetAndFebNet = janNet + febNet;
    console.log("Jan Net and Feb Net " + janNetAndFebNet);
    const govCalc = ((Number(janNetAndFebNet)/9)*(Number(this.state.WEEKS_IN_YEAR)/12));
    console.log("Gov Calc " + govCalc);
    return this.round(govCalc);
  }

  totalPay(govCalc){
    if(govCalc <= 0){
        return 0;
    }
    const totalPay = govCalc - Number(this.state.GOV);
    console.log("Total Pay " + totalPay);
    return this.round(totalPay);
  }

  totalGross(totalPay){
    if(totalPay <= 0){
      return 0;
    }
    const totalGross = totalPay - Number(this.state.PC);
    console.log("Total Gross " + totalGross);
    return this.round(totalGross);
  }

  paye(totalGross){
    if(totalGross <= 0) {
      return 0;
    }
    const PAYE = Number(Number(totalGross)*0.2) - Number(this.state.TC);
    console.log("PAYE " + PAYE);
    return this.round(PAYE);
  }


  calculateNet(totalGross, PAYE){
    if(totalGross <= 0){
      return 0;
    }
    const totalNet = totalGross - PAYE - Number(this.state.USC) + Number(this.state.GOV);
    console.log("Total Net " + totalNet);
    return this.round(totalNet);
  }

  calculatePercentageDifference(original, newVal){
    if(original <= 0 || !newVal){
      return 0;
    }
    return this.round(((newVal - original)/ original)*100);
  }

  render() {
    const govCalc = this.govCalc();
    const totalPay = this.totalPay(govCalc);
    const totalGross = this.totalGross(totalPay);
    const PAYE = this.paye(totalGross);
    const calcNet = this.calculateNet(totalGross, PAYE);
    const janDiff = this.calculatePercentageDifference(this.state.janNet, calcNet);

    return (
        <div className="container-fluid">
           <div className="col-md-12">
             <div className="col-md-6">
                <h2>DISCLAIMER</h2>
                <p>None of the data entered is stored and no external calls are made by this application</p>
                <h2>Calculator</h2>
                <p>Jan Net : <input value={this.state.financialGoal} type="number" onChange={this.setJanNet.bind(this)}/></p>
                <p>Feb Net : <input value={this.state.financialGoal} type="number" onChange={this.setFebNet.bind(this)}/></p>
                <p>Tax Credits Per Month : <input value={this.state.financialGoal} type="number" onChange={this.setTC.bind(this)}/></p>
                <p>Pension Contribution : <input value={this.state.financialGoal} type="number" onChange={this.setPC.bind(this)}/></p>
                <p>Gov Subsidy : <input value={this.state.financialGoal} type="number" onChange={this.setGov.bind(this)}/></p>
                <p>USC : <input value={this.state.financialGoal} type="number" onChange={this.setUSC.bind(this)}/></p>
                <br/>
                <br/>
                <p>Gov Calc : <strong>€{govCalc}</strong></p>
                <p>Total Pay by Company : <strong>€{totalPay}</strong></p>
                <p>Total Gross : <strong>€{totalGross}</strong></p>
                <p>PAYE : <strong>€{PAYE}</strong></p>
                <p>New Net (Ensure to add a USC Figure above) : <strong>€{calcNet}</strong></p>
                <p>% difference from Jan : <strong>{janDiff}%</strong></p>
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
