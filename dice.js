exports.dice = (msg, message) => {
  (async () => {

    try {
      let diceContent = message.content;
      let splitDiceContent = diceContent.split(" ");
      let LastValDiceContent = splitDiceContent[splitDiceContent.length - 1];
      let diceSplitContent = LastValDiceContent.split("d");
      let numberOfDices = diceSplitContent[0];
      let diceNumber = diceSplitContent[1];
      let intdiceNumberValue = parseInt(diceNumber);
      let intdiceNumber = parseInt(numberOfDices);
      if (!intdiceNumber.isNaN() && !intdiceNumberValue.isNaN()) {
        for (i = 1; i <= intdiceNumber; i++) {
          let valuecctl = Math.floor(Math.random() * intdiceNumberValue) + 1;
          msg(`${message.author} tu as fais un ${valuecctl} !`);
          if (i > 10)
            break;
        }
      }
    } catch (error) {
      msg("écris bien sale chien");
    }
  })();
}