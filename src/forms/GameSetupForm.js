import "./Form.css"; 

const GameSetupForm = ({ setGameStart, formData, setFormData }) => {
  
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!formData.letters || formData.maxWords <= 0) return;
    setGameStart(true);
  };

  return (
    <form
      className="Form"
      onSubmit={handleSubmit}
      autoComplete="off">
      <div className="Form-field">
        <label className="Form-label" htmlFor="letters">
          Seed:
        </label>
        <input className="Form-input"
          type="text"
          name="letters"
          value={formData.letters}
          onChange={handleChange}/>
      </div>
      <div className="Form-field">
        <label className="Form-label" htmlFor="maxWords">
          Number of Words:
        </label>
        <input className="Form-input"
          type="number"
          name="maxWords"
          min="1"
          max="20"
          value={formData.maxWords}
          onChange={handleChange}/>
      </div>
      <button className="Form-btn" type="submit">Start</button>
    </form>);
};

export default GameSetupForm;