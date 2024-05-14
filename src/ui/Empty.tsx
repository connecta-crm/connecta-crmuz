function Empty({ resourceName }: { resourceName: string }) {
  return <p className="table-empty">No {resourceName} could be found.</p>;
}

export default Empty;
