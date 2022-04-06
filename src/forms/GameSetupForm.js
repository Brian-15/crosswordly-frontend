

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

  return <form onSubmit={handleSubmit}>
    <label htmlFor="letters">
      Letters to seed the puzzle:
      <input
        type="text"
        name="letters"
        value={formData.letters}
        onChange={handleChange}
      />
    </label>
    <label htmlFor="maxWords">
      Maximum Number of Words:
      <input
        type="number"
        name="maxWords"
        min="1"
        max="20"
        value={formData.maxWords}
        onChange={handleChange}
      />
    </label>
    <button type="submit">Start</button>
  </form>
};

export default GameSetupForm;