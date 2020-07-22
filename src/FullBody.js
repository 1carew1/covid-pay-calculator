import React, { Component } from 'react';

class FullBody extends Component {
  render() {
    return (
        <div className="container-fluid">
           <div className="col-md-12">
             <div className="col-md-6">
                <p>calculator</p>
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
                <p>PAYE = 20% of Gross = 0.2((26X/27) - 1516.67 -PC)</p>
                <p>Net Pay = Total Gross Pay - PAYE - USC + TC + Gov Subsidy</p>
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
