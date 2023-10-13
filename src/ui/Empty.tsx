interface IEmptyProps {
  resourceName: string;
}

function Empty({ resourceName }: IEmptyProps) {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
