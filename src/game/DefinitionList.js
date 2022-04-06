import { v4 as uuid } from "uuid";

const DefinitionList = ({ definitions }) => {
  return <ol>
    {definitions.map(({ definition, category, example }) => {
      return <li key={uuid()}>
        <b><i>{ category.name }</i></b><br/>
        <p>{ definition }</p>
        { example
          ? <p>Example:<br/><i> {example} </i></p>
          : undefined }
      </li>;
    })}
  </ol>
};

export default DefinitionList;