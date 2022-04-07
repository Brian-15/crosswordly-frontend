import "./Form.css"; 

const GuessForm = ({ letterMap, setLetterMap, letters, guess, setGuess, handleGuess }) => {

  const handleChange = evt => {
    const { value } = evt.target;
    const lastChar = value.at(-1);
    if (value.length > guess.length) {
      // check that last letter entered is present in rootWord, and length of guess does not exceed rootWord
      if (value.length > letters.length ||
        (value.length > 0 && letters.indexOf(lastChar) === -1))
      {
        return;
      }

      const { total, count } = letterMap[lastChar];
      // check if number of letters exceeds that supplied in rootword
      if (count + 1 > total) {
        return;
      }
      letterMap[lastChar].count++;
    } else {
      letterMap[guess.at(-1)].count--;
    }
    setLetterMap(letterMap);
    setGuess(value);
  };

  return (
    <form
      className="Form"
      onSubmit={handleGuess}
      autoComplete="off">
      <input className="Form-field"
        name="guess"
        value={guess}
        onChange={handleChange}/>
      <button className="Form-btn" style={{ margin: "auto" }} type="submit">Guess</button>
    </form>);
};

export default GuessForm;