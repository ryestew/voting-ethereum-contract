var bel = require('bel')
var csjs = require('csjs-inject')
var Web3 = require('web3')

var main

module.exports = voteConfirmation

function voteConfirmation (proposal, BallotContract, fromAddress) {

  main = bel`
    <div class=${css.transparentLayer} id="transparentLayer">
      <i class="fa fa-close ${css.close}" onclick=${()=>back()}></div>
      <div class=${css.confirmationMain}>
        <div class=${css.confirmationHead}>
          <div class=${css.confirmationTitle} id="title">Confirm vote?</div>
          <div class=${css.submitContainer}>
            <div class=${css.submitButton} id="submit" onclick=${()=>sendVote(proposal, fromAddress, BallotContract)}>Submit</div>
            <div class=${css.submitText} id="text">By clicking submit you confirm that your selection is correct!</div>
          </div>
        </div>
        <div class=${css.confirmationBox}>
          <div class=${css.confirmationTitle}>${proposal.title}</div>
          <div class=${css.confirmationDesc}>${proposal.description}</div>
        </div>
      </div>
    </div>
  `
  return main

}
  // HELPERS

  function sendVote (proposal, fromAddress, BallotContract) {
    // VOTE FOR ONE PROPOSAL
    // vote(<here goes proposalAddress>
    BallotContract.methods.vote(proposal.targetAddress).send({ from: fromAddress}, function (err, txHash) {
      if (err) return console.error(err)
      var submit = document.getElementById("submit")
      var text = document.getElementById("text")
      var title = document.getElementById("title")
      title.parentNode.removeChild(title)
      submit.style.borderColor = 'green'
      text.innerHTML = `Your vote was succesfully sent! Click the button to get the transaction receipt.`
      var url = 'https://ropsten.etherscan.io/tx/' + txHash
      submit.onclick = null
      submit.innerHTML = `<a href=${url} target="_blank">Etherscan</a>`
    })
  }

  function back () {
    location = location
  }

var css = csjs`
  .transparentLayer {
    animation: fadeIn 2s;
    position: relative;
    background-color: transparent;
    width: 90%;
    display: flex;
    justify-content: center;
  }
  .confirmationMain {
    font-weight: 900;
    letter-spacing: 2px;
    background-color: #fcfbec;
    padding: 30px 0 15px 20px;
    width: 77%;
  }
  .close {
    font-size: 14px;
    display: flex;
    z-index: 999;
    position: absolute;
    right: 7%;
    top: -10%;
    color: #fcfbec;
    cursor: pointer;
  }
  .close:hover {
    color: #b61114;
  }
  .confirmationHead {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .confirmationTitle {
    font-size: 45px;
    text-transform: uppercase;
    padding: 0 0 10px 0;
  }
  .submitContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: #b61114;
  }
  .submitButton {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    padding: 5%;
    width: 20%;
  }
  .submitButton:hover {
    background-color: #e2e1dc;
    cursor: pointer;
  }
  .submitText {
    font-size: 16px;
    width: 60%;
  }
  .confirmationBox  {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    width: 85%;
    margin: 30px 0 10px 0;
    padding: 5%;
  }
  .confirmationDesc {
    font-size: 26px;
    color: #b61114;
  }
  .submitButton a {
    text-decoration: none;
    color: green;
  }
`
